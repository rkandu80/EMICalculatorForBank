function monthWiseEmi() {
    var loanAmount = document.getElementById("LoanAmount").value;
    var annualInterestRate = document.getElementById("InterestRate").value;
    var loanTermMonths = document.getElementById("termsInMonth").value;
    var jsonArray = [];
	var updatedArray=[];
    var startDateStr = document.getElementById("LoanDate").value; 
    var paymentType= document.getElementById("paymentType").value;

    // Function to parse a date string in "DD/MM/YYYY" format into a Date object
    function parseDate(dateStr) {
        var parts = dateStr.split('/');
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1;  // Months are zero-based in JavaScript Date
        var year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }

    var startDate = parseDate(startDateStr);

    // Function to calculate the monthly installment (EMI)
    function calculateInstallment() {
        var monthlyRate = annualInterestRate / (12 * 100);
        var installment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTermMonths));
        return parseFloat(installment.toFixed(2));
    }

    var installment = calculateInstallment();

    // Function to format a Date object into "DD/MM/YYYY" format
    function formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1; // Months are zero-based, so add 1
        var year = date.getFullYear();
        return (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) + '/' + year;
    }

    // Function to calculate the details for each month
    function calculateMonthlyDetails(loanAmount, annualInterestRate, loanTermMonths, installment) {
        var balance = loanAmount;
        var monthlyRate = annualInterestRate / (12 * 100);
        
        for (var month = 1; month <= loanTermMonths; month++) {
            var interest = balance * monthlyRate;
            var principal = installment - interest;
            balance -= principal;

            // Calculate the date for the current month
            var installmentDate = new Date(startDate);
            
            if(paymentType==="BeginingOfThePeriod"){
            installmentDate.setMonth(startDate.getMonth()+month-1);
            }else if(paymentType==="EndOfThePeriod"){
            installmentDate.setMonth(startDate.getMonth() + month);
            }
            var formattedDate = formatDate(installmentDate); // Format the date to "DD/MM/YYYY"

            // Creating a JSON object with serial number, interest, principal, balance details, and date for each month
            var newJsonObject = {
                "S.No.": month,
                "Due Date": formattedDate,
                "Installment": installment.toFixed(2),
                "Interest": interest.toFixed(2),
                "Principal": principal.toFixed(2),
                "Balance": balance.toFixed(2)
            };

            // Adding the JSON object to the array
            jsonArray.push(newJsonObject);
        }
    }

    calculateMonthlyDetails(loanAmount, annualInterestRate, loanTermMonths, installment);

    // Output the JSON array to the console
    //console.log(JSON.stringify(jsonArray, null, 2));
	
	updatedArray = JSON.stringify(jsonArray, null, 2);

    // Parsing the JSON string back to an array of objects
    updatedArr = JSON.parse(updatedArray);console.log(updatedArray);

    // Calling the function to add data to a grid (assuming this function is defined elsewhere)
    addDataToGrid('table2', updatedArr);
}
