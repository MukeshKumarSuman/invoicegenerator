$(document).ready(function() {
	console.log("html page loaded");
	
});
const regExpForSpecialCharactor = /[\:\' ']/g;
function generateInvoice(input) {
	const $invoiceForm = $('#invoice_form_edit');
	const $invoiceViewContainer = $('#invoice-view');
	$invoiceViewContainer.children().remove();
	const companyInfo = {
		logo: 'image/rolafaceSoftwareLogo.png',
		name: 'Rolaface Software',
		address: `86, lane no 5 lower tunwala<br>
				dehradun-248008<br>
				contactus@rolaface.com`
	};
		
	const invoiceDetailsData = getInvoiceDetails($invoiceForm);
	const billToData = getBillToData($invoiceForm);
	const itemEntry = getItemIntry($invoiceForm);
	const finalAmount = getFinalAmount($invoiceForm);
	
	const $companyInfoHtml = $(`<section class="logo">
		<img src="${companyInfo.logo}" height="80" width="80">
	</section>
	<section class="company">
		<address>
			<h1 class="company-name">${companyInfo.name}</h1>
			${companyInfo.address}
		</address>
	</section>`);
	const $backButton = $('<section class="back-button"><button type="button" onclick="toggleEditMode()">Back</button></section>');
	const $horizontalLine = $('<hr class="horizontal-line"/>');
	const $footer = $(`
		<section class="note">Note:<br>
		**The invoice amount is net of all taxes and levies.<br>
		**All invoice amounts are in USD.</section>
		<section class="question">
		Questions?<br>
		Email us at contactus@rolaface.com<br>
		or call us at +91 9945881982
		</section>
		<footer>
			<p1>Thank you for your business!</p1>
			<hr>
			<p2>86, Lane 5, Laxmipuram, Lower Tunwala, Dehradun-248008, INDIA</p2>
		</footer>
	`);
	const $invoiceDetailsHTML = getHTML(invoiceDetailsData, 'invoice-details');
	const $billToHTML = getHTML(billToData, 'bill-to');	
	const $itemIntryHTML = getItemIntryHTML(itemEntry);
	const finalAmountHTML = getFinalAmountHTML(finalAmount);
	const $infoSection = $('<section class="info"></section>').append($companyInfoHtml).append($invoiceDetailsHTML);
	$invoiceViewContainer.append($infoSection).append($billToHTML).append($itemIntryHTML).append($horizontalLine).append(finalAmountHTML).append($backButton).append($footer);
	$invoiceForm.addClass('hide');
	$invoiceViewContainer.removeClass('hide');
	console.log('Invoice Display');
}

function toggleEditMode() {
	$('#invoice_form_edit').removeClass('hide');
	$('#invoice-view').addClass('hide');
}

function getInvoiceDetails($invoiceForm) {
	const $invoiceDetailsContainer = $invoiceForm.find('.invoice-details');
	return getHeadersAndRowsData($invoiceDetailsContainer);
}
function getRowsHTML(invoiceDetailsData) {
	
}
function getHTML(data, className) { 
	let html = `
	<section class="${className}">
			<h1 class="title">${data.title}</h1>
	</section>`;
	const $table = $('<table></table>');
	for(let i = 0; i < data.rowsData.length; i++) {
		$table.append(`<tr><td>${data.headers[i]}</td><td>${data.rowsData[i]}</td></tr>`);
	}
	html = $(html).append($table);
	return html;
}
function getBillToData($invoiceForm) {
	const $billToDataContainer = $invoiceForm.find('.bill-to');
	return getHeadersAndRowsData($billToDataContainer);
}

function getItemIntry($invoiceForm) {
	const $itemEntryContainer = $invoiceForm.find('.item-entry');
	return getItemEntryHeadersAndRowData($itemEntryContainer);
}
function getItemIntryHTML(itemEntry) {
	let $itemHtml = $(`
	<section class="item-entry">
		</section>
	`);
	const $table = $('<table class="item-entry-table"></table>');
	const $thRow = getTableHeaderRow(itemEntry.headers);
	$table.append($thRow);
	for(let i = 0; i < itemEntry.rowsEntry.length; i++) {
		const row = itemEntry.rowsEntry[i];
		if(row[0]) {
			const $tdRow = getTableDataRow(itemEntry.rowsEntry[i]);
			$table.append($tdRow);
		}
	}
	$itemHtml = $itemHtml.append($table);
	return $itemHtml;
}
function getTableDataRow(row) {
	const $tr = $('<tr></tr>');
	for(let i = 0; i < row.length; i++) {
		$tr.append(`<td>${row[i]}</td>`);
	}
	return $tr;
}

function getTableHeaderRow(headers) {
	const $tr = $('<tr></tr>');
	for(let i = 0; i < headers.length; i++) {
		$tr.append(`<th>${headers[i]}</th>`);
	}
	return $tr;
}

// accept container which has table and return header and table row data.
function getItemEntryHeadersAndRowData($container) {
	const rowDataValues = [];
	const columnHeader = {};
	const $trs = $container.find('tr');
	const headers = getTableHeaders($trs[0]);
	const rowsEntry = getRowsEntry($trs);
	
	return {
		headers,
		rowsEntry
	};
	
}
function getFinalAmount($invoiceForm) {
	const total = $invoiceForm.find('.final-total').text();
	const balanceDue = $invoiceForm.find('.balance-due').text();
	const finalAmout = {
		total,
		balanceDue
	};
	return finalAmout;
}
function getFinalAmountHTML(finalAmount) {
	return $(`<section class="final-amount">
			<table>
				<tr>
					<td>GRAND TOTAL</td>
					<td class="final-total">${finalAmount.total}</td>
				</tr>
			</table>
		</section>`);
}
// accept row which has table table header and return all header
function getTableHeaders(headerRow) {
	const headers = [];
	const $headerRow = $(headerRow).children();
	$headerRow.each( (index, header) => {
		const hedaerValue = $(header).text();
		headers.push(hedaerValue);
	});
	return headers;
}

// accept table all row and table header in a array and return all row data w.r.t to their header.
function getRowsEntry($trs) {
	const rowsEntry = [];
	for(let i=1; i < $trs.length; i++) {
		const rowEntry = [];
		const $row = $($trs[i]);
		$row.children().each( (index, td) => {
			const value = $(td).find('input').val();
			rowEntry.push(value);
		});
		rowsEntry.push(rowEntry);
	}
	return rowsEntry;
}


function getHeadersAndRowsData($container) {
	const $trs = $container.find('tr');
	const title = $container.find('.title').text();
	const headers = [];
	const rowsData = [];
	$trs.each((index, tr) => {
		const $tr = $(tr);
		let columnHeaderProp;
		let columnHeaderValue;
		let columnValue;
		$tr.children().each((index, td) => {
			const $td = $(td);
			const $input = $td.find('input');
			const $textArea = $td.find('textarea');
			if($input.length) {
				columnValue = $input.val();
			} else if($textArea.length) {
				columnValue = $textArea.val();
			}else {
				columnHeaderValue = $td.text();
			}
		});
		headers.push(columnHeaderValue);
		rowsData.push(columnValue);
	});
	
	return {
		title,
		headers,
		rowsData
	}
}