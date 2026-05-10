function titleCase(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

console.log("--- Level 1: Title Case ---");
console.log(titleCase("I'm a little tea pot"));
console.log(titleCase("sHoRt AnD sToUt"));    

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

console.log("\n--- Level 2: Delay (Tunggu 3 Detik) ---");
delay(3000).then(() => console.log('Runs after 3 seconds'));
function fetchData(url: string, callback: (err: string | null, data: string | null) => void) {
  setTimeout(() => {
    if (!url) {
      callback("URL is required", null);
    } else {
      callback(null, `Data dari ${url}`);
    }
  }, 1000);
}

function processData(data: string, callback: (err: string | null, data: string | null) => void) {
  setTimeout(() => {
    if (!data) {
      callback("Data is required", null);
    } else {
      callback(null, data.toUpperCase());
    }
  }, 1000);
}

function fetchDataPromise(url: string): Promise<string> {
  return new Promise((res, rej) => fetchData(url, (e, d) => e ? rej(e) : res(d!)));
}

function processDataPromise(data: string): Promise<string> {
  return new Promise((res, rej) => processData(data, (e, d) => e ? rej(e) : res(d!)));
}

async function processDataAsync(url: string) {
  console.log("\n--- Level 2.5: Mengambil & Memproses Data ---");
  try {
    const data = await fetchDataPromise(url);
    const processed = await processDataPromise(data);
    console.log("Processed Data:", processed);
  } catch (err) {
    console.error("Error:", err);
  }
}

processDataAsync("https://example.com");