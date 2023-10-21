/* ====== AOV Calculator ========= */

// Counter
const counterAnim = (qSelector, start = 0, end, duration = 1000, prefix) => {
  const target = document.querySelector(qSelector);
  let startTimestamp = null;
  const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress   = Math.min((timestamp - startTimestamp) / duration, 1);
      target.innerText = prefix + Math.floor(progress * (end - start) + start).toLocaleString("en-US");
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
  window.requestAnimationFrame(step);
};

function expectedCreditKey() {

	console.log('');
	// let addresableRevenue    = document.getElementById('addresableRevenue').value * 1;
	// let addresableRevenueText   = document.getElementById('addresableRevenue').value;
	// let addresableRevenueCommas = addresableRevenueText.split(',').join('');
	// let addresableRevenue       = addresableRevenueCommas * 1;

	
	// let averOrderValue = document.getElementById('averOrderValue').value * 1;
	// let averOrderValueText   = document.getElementById('averOrderValue').value;
	// let averOrderValueCommas = averOrderValueText.split(',').join('');
	// let averOrderValue       = averOrderValueCommas * 1;


	// let expectedCreditKeyOrderVolume;
	// expectedCreditKeyOrderVolume = addresableRevenue / averOrderValue;

	// // All field must be filled
	// if (addresableRevenue > 0.001 && averOrderValue > 0.001) {
	// 	// Results
	// 	document.getElementById('expectedCreditKeyOrderVolume').innerHTML  = Math.round(expectedCreditKeyOrderVolume).toLocaleString("en-US").toString(2);
	// 	// Animation
	// 	counterAnim("#expectedCreditKeyOrderVolume", 0, expectedCreditKeyOrderVolume, 1000, " ");
	// }
	
}

function AovCalc() {

	// Input values:
	
	// let averOrderValue = document.getElementById('averOrderValue').value * 1;
	let averOrderValueText      = document.getElementById('averOrderValue').value;
	let averOrderValueCommas    = averOrderValueText.split(',').join('');
	let averOrderValue          = averOrderValueCommas * 1;
	let creditKeyTakeRate       = document.getElementById('range').value / 100;
	let creditKeyAverageLift    = document.getElementById('creditKeyAverageLift').value / 100;

	// console.log(creditKeyAverageLift);
	// if (creditKeyAverageLift < 1 ) {
	// 	creditKeyAverageLift = 1 + creditKeyAverageLift;
	// }
	// console.log(creditKeyAverageLift);

	// let totalRevenue         = document.getElementById('totalRevenue').value * 1;
	let totalRevenueText   = document.getElementById('totalRevenue').value;
	let totalRevenueCommas = totalRevenueText.split(',').join('');
	let totalRevenue       = totalRevenueCommas * 1;

	// let addresableRevenue    = document.getElementById('addresableRevenue').value * 1;
	let addresableRevenueText   = document.getElementById('addresableRevenue').value;
	let addresableRevenueCommas = addresableRevenueText.split(',').join('');
	let addresableRevenue       = totalRevenue * (addresableRevenueCommas * 1) / 100 ;
	console.log(addresableRevenue);

	let expectedCreditKeyOrderVolume;
	let totalRevenueCreditKey;
	let creditKeyDifference;
	let totalRevenueLiftPerc;
	let totalRevenueLift;
	let companyRevenueInDollar;

	// Calculations
	//creditKeyTakeRate 			     = creditKeyTakeRate.toFixed(2);
		expectedCreditKeyOrderVolume = addresableRevenue / averOrderValue;
// According to Google Sheet:
 // totalRevenueCreditKey 		   = totalRevenue - addresableRevenue + (averOrderValue * expectedCreditKeyOrderVolume) - (averOrderValue * expectedCreditKeyOrderVolume * creditKeyTakeRate) + (averOrderValue * expectedCreditKeyOrderVolume * creditKeyTakeRate * creditKeyAverageLift);
		totalRevenueCreditKey				 = totalRevenue + (addresableRevenue * creditKeyTakeRate * creditKeyAverageLift);
		creditKeyDifference 		     = totalRevenueCreditKey - totalRevenue;
		totalRevenueLiftPerc			   = (totalRevenueCreditKey / totalRevenue - 1) * 100;
		totalRevenueLiftPerc 				 = totalRevenueLiftPerc.toFixed(2);
		totalRevenueLift 						 = totalRevenueCreditKey - totalRevenue;
		companyRevenueInDollar       = addresableRevenue;

	if (addresableRevenue > 0.001 && averOrderValue > 0.001 && creditKeyAverageLift > 0.001 && totalRevenue > 0.001) {
		// Results
		document.getElementById('totalRevenueCreditKey').innerHTML  = "$" + Math.round(totalRevenueCreditKey).toLocaleString("en-US").toString(2);
		document.getElementById('creditKeyDifference').innerHTML    = "$" + Math.round(creditKeyDifference).toLocaleString("en-US").toString(2);
		document.getElementById('totalRevenueLift').innerHTML       = "+" + totalRevenueLiftPerc.toLocaleString("en-US") + " %";	// " % <span id='revenue-gain-text'>revenue gain</span>";
		document.getElementById('existingTotalRevenue').innerHTML   = "$" + totalRevenue.toLocaleString("en-US");	
		document.getElementById('companyRevenueInDollar').innerHTML = "$" + companyRevenueInDollar.toLocaleString("en-US");

		// Animation
		counterAnim("#totalRevenueCreditKey",  0, totalRevenueCreditKey, 1000, "$");
		counterAnim("#creditKeyDifference",    0, creditKeyDifference, 1000, "$");
		counterAnim("#existingTotalRevenue",   0, totalRevenue, 1000, "$");
		counterAnim("#companyRevenueInDollar", 0, companyRevenueInDollar, 1000, "$");
		// counterAnim("#totalRevenueLift",    0, totalRevenueLift, 1000, " %");
	}
}

// Add dollar sign
function addDollarSign() {
	let inputDollar = document.getElementById("inputDollar");
	inputDollar.className += " input-dollar";
	document.getElementById("addresableRevenue").style.paddingLeft = '25px';
}
function addDollarSign1() {
	let inputDollar = document.getElementById("inputDollar1");
	inputDollar.className += " input-dollar";
	document.getElementById("averOrderValue").style.paddingLeft = '25px';
}
function addDollarSign2() {
	let inputDollar = document.getElementById("inputDollar2");
	inputDollar.className += " input-dollar";
	document.getElementById("totalRevenue").style.paddingLeft = '25px';
}
// function addPercentSign() {
// 	let inputPercent = document.getElementById("inputPercent");
// 	inputPercent.className += " input-percent";
// }

// Limitation to input by characters
function enforceMaxLength(element, maxLength) {
  if (element.value.length > maxLength) {
    element.value = element.value.slice(0, maxLength);
  }
}

// commas to thousands
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}