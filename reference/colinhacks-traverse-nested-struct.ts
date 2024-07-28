function get(data: any, pathStr: string) {
  const path = pathStr.split(".");
  while (path.length) {
    const key = path.shift()!;
    data = data[isNaN(Number(key)) ? key : Number(key)];
    if (data === undefined) break;
  }
  return data;
}

// Test
const data = { items: [{ name: "bronifty" }] };
const val = get(data, "items.0");
console.log(val); // Should output "bronifty"
