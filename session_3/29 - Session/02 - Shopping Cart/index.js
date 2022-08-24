$(function () {
  $("#divProducts > img").click(function () {
    const id = $(this).attr("data-product-id");

    if (!$(this).attr("data-bought")) {
      $.ajax({ method: "PUT", url: "/api/add-to-cart/" + id });
      $(this).css("border", "5px solid blue");
      $(this).attr("data-bought", true);
    } else {
      $.ajax({ method: "PUT", url: "/api/remove-from-cart/" + id });
      $(this).css("border", "5px solid black");
      $(this).removeAttr("data-bought");
    }
  });

  $("#buttonCheckout").click(function () {
    $.ajax({
      url: "/api/checkout",
      success: (cartProducts) => {
        let summary = "<h4>Products: </h4><ul>";
        let total = 0;
        for (const p of cartProducts) {
          summary += `<li>${p.name} = $${p.price}</li>`;
          total += p.price;
        }
        summary += `</ul><h4>Total Price: $${total}</h4>`;

        $("#divCheckout").html(summary);
      },
    });
  });
});
