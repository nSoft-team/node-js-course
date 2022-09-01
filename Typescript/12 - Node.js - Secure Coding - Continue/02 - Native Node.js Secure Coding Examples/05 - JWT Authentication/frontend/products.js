$(() => {
  if (!isUserLoggedIn()) return (location = "/login");

  $.ajax({
    url: "/api/products",
    contentType: "application/json",
    dataType: "json",
    error: (err) => alert(err.responseText),
    success: (products) => {
      let table = `<table class="products-table"><thead><tr><th>Name</th><th>Price</th><th>Stock</th></tr></thead><tbody>`;
      for (const p of products) {
        table += `<tr><td>${p.name}</td><td>$${parseFloat(
          Math.round(p.price * 100) / 100
        ).toFixed(2)}</td><td>${p.stock}</td></tr>`;
      }
      table += "</tbody></table>";
      $("#container").html(table);
    },
  });
});
