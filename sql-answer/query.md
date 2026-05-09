-- Level 1: Customers from Germany
SELECT COUNT(*) FROM Customers WHERE Country = 'Germany';

-- Level 2: Countries with most customers (Min. 5)
SELECT COUNT(CustomerID), Country 
FROM Customers 
GROUP BY Country 
HAVING COUNT(CustomerID) >= 5 
ORDER BY COUNT(CustomerID) DESC;

-- Level 3: Reverse Engineer Results (Order Summary) 
SELECT 
    c.CustomerName, 
    COUNT(o.OrderID) AS OrderCount, 
    MIN(o.OrderDate) AS FirstOrder, 
    MAX(o.OrderDate) AS LastOrder
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerName
ORDER BY OrderCount DESC, FirstOrder ASC
LIMIT 9;