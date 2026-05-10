<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
interface Msg { id: number; text: string; sender: 'me' | 'other'; timestamp?: string }
const messages = ref<Msg[]>([]);
const input = ref('');
const messagesContainer = ref<HTMLElement | null>(null);
let socket: WebSocket | null = null;

const sendMessage = () => {
  if (!input.value.trim()) return;
  const payload: Msg = { id: Date.now(), text: input.value.trim(), sender: 'me', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  if (socket && socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(payload));
  messages.value.push(payload);
  input.value = '';
};

watch(messages, async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
});

onMounted(() => {
  socket = new WebSocket('ws://localhost:8080');
  socket.onmessage = (e) => {
    try {
      const d = JSON.parse(e.data);
      messages.value.push({ id: Date.now(), text: d.text ?? String(d), sender: 'other', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    } catch {
      messages.value.push({ id: Date.now(), text: String(e.data), sender: 'other', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    }
  };
});

onUnmounted(() => { if (socket) socket.close(); });
</script>
<template>
  <div class="chat-wrapper">
    <header class="chat-header">Simple Chat</header>
    <div class="messages-container" ref="messagesContainer">
      <TransitionGroup name="slide-up" tag="div" class="message-list">
        <div v-for="m in messages" :key="m.id" :class="['message-row', m.sender]">
          <div v-if="m.sender === 'other'" class="avatar">A</div>
          <div class="bubble-wrap">
            <div class="bubble-text">{{ m.text }}</div>
            <div class="bubble-meta"><span class="time">{{ m.timestamp }}</span></div>
          </div>
          <div v-if="m.sender === 'me'" class="avatar me">Me</div>
        </div>
      </TransitionGroup>
    </div>
    <div class="input-area">
      <input v-model="input" @keyup.enter="sendMessage" placeholder="Ketik pesan..." aria-label="Message input" />
      <button class="send-btn" @click="sendMessage" :disabled="!input.trim()" aria-label="Send message">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/></svg>
      </button>
    </div>
  </div>
</template>
<style scoped>
.chat-wrapper { display: flex; flex-direction: column; height: 600px; width: 100%; max-width: 820px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(17,24,39,0.08); background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%); }
.chat-header { padding: 14px 18px; background: linear-gradient(90deg,#0563f7,#00b4ff); color: #fff; font-weight: 600; letter-spacing: 0.2px; }
.messages-container { flex: 1; overflow-y: auto; padding: 18px; background: linear-gradient(180deg, rgba(5,99,247,0.02), transparent 40%); }
.message-list { display: flex; flex-direction: column; gap: 12px; }
.message-row { display: flex; align-items: flex-end; gap: 8px; }
.message-row.other { justify-content: flex-start; }
.message-row.me { justify-content: flex-end; }
.avatar { width: 36px; height: 36px; border-radius: 50%; background: #e6f0ff; display:flex; align-items:center; justify-content:center; color:#0563f7; font-weight:700; }
.avatar.me { background:#cfeef8; color:#00657a }
.bubble-wrap { max-width: 72%; display:flex; flex-direction:column; gap:6px; }
.bubble-text { padding: 10px 14px; border-radius: 12px; background: #f1f5f9; color:#0f172a; box-shadow: 0 1px 2px rgba(2,6,23,0.04); }
.message-row.me .bubble-text { background: linear-gradient(90deg,#0ea5e9,#0369a1); color:#fff; }
.bubble-meta { font-size: 11px; color: #6b7280; align-self: flex-end; }
.input-area { display:flex; gap:8px; padding: 12px; border-top: 1px solid rgba(15,23,42,0.04); background: #fff; }
.input-area input { flex:1; padding: 10px 12px; border-radius: 10px; border: 1px solid #e6eef6; outline:none; font-size:14px; }
.input-area input:focus { box-shadow: 0 0 0 4px rgba(6,99,247,0.06); }
.send-btn { background: #0563f7; color: #fff; border: none; padding: 10px 12px; border-radius: 10px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.slide-up-enter-active { transition: all 0.28s cubic-bezier(.2,.8,.2,1); }
.slide-up-enter-from { opacity: 0; transform: translateY(14px); }

@media (max-width: 640px) {
  .chat-wrapper { height: 100vh; border-radius: 0; }
  .avatar { width:32px; height:32px; }
}
</style>