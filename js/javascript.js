var TaxAmount = 0.20;
var fadeTime = 10;
/* on quanlty change */
$('tr td input').change( function() {
  updateCal(this);
});
/* on remove row*/
$('.edit-buttons').click( function() {
	/* debugger;*/
  removeRow(this);
});


/* Recalculate cart on change*/
function recalCart(){
  var subtotal = 0;
  /* Sum up row totals */
  $('table tbody tr').each(function () {
    subtotal += parseFloat($(this).find('td.cost').text());
	console.log(subtotal);
  });  
  /* Calculate totals */
  var tax = subtotal * TaxAmount;
  var total = subtotal + tax;  
  /* Update totals display */
  $('.sum').fadeOut(fadeTime, function() {
    $('#subtotal').html(subtotal.toFixed(2));
    $('#tax').html(tax.toFixed(2));
 /*   $('#shipping').html(shipping.toFixed(2));*/
    $("#grandtotal").html(total.toFixed(2));
    if(total == 0){
      $('.buy').fadeOut(fadeTime);
    }else{
      $('.buy').fadeIn(fadeTime);
    }
    $('.sum').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateCal(quantityInput){
  /* Calculate line price */
  /* debugger;*/  
	var productRow = $(quantityInput).parent().parent();
	var price = parseFloat(productRow.find('span.price').text());
	var quantity = $(quantityInput).val();
	var linePrice = price * quantity;
 
  /* Update line price display and recalc cart totals */
  productRow.find('td.cost').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalCart();
      $(this).fadeIn(fadeTime);
    });
  });   
}

/* Remove row from cart */
function removeRow(removeButton){
  var productRow = $(removeButton).parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalCart();
  });
}