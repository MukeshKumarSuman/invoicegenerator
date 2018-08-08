$(document).ready(function() {
	console.log("html page loaded");
});

function addRow() {
	const $lastRow = $('.item-entry-table tr:last');
	const rowTemplate = `<tr>
			<td>
				<input type="text" class="qty" onchange="calculateIndividualTotalAmount()"/>
			</td>
			<td>
				<input type="text"/>
			</td>
			<td>
				<input type="text"/>
			</td>
			<td>
				<input type="text" class="unit-price" onchange="calculateIndividualTotalAmount()"/>
			</td>
			<td>
				<input type="text" class="individual-total" onchange="calculateFinalTotalAmount()"/>
			</td>
		</tr>`
	$lastRow.after($(rowTemplate));
}

function removeLastRow() {
	const $lastRow = $('.item-entry-table tr:last');
	$lastRow.remove();
	calculateFinalTotalAmount();
}

function calculateIndividualTotalAmount() {
	let qty = 0;
	let unitPrice = 0;
	if(event.currentTarget.classList.contains('qty')) {
		qty = Number(event.target.value);
		unitPrice = Number($(event.currentTarget.parentElement.parentElement).find('.unit-price').val());
	} else {
		unitPrice = Number(event.target.value);
		qty = Number($(event.currentTarget.parentElement.parentElement).find('.qty').val());
	}
	const $individualTotal = $(event.currentTarget.parentElement.parentElement).find('.individual-total');
	$individualTotal[0].value = qty*unitPrice;
	calculateFinalTotalAmount();
}

function calculateFinalTotalAmount() {
	const $totalTd = $('.item-entry-table tr td:last-child').find('input');
	let finalTotal = 0;
	$totalTd.each((i, totalCell) => {
		finalTotal = finalTotal + Number(totalCell.value);
	});
	const $finalTotalCell = $('.final-total').text(finalTotal);
	const $balanceDue = $('.balance-due').text(finalTotal);
	console.log('about to cal total');
}

// 