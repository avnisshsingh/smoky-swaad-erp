/**
 * ==========================================
 * Get Reports Data
 * ==========================================
 */
function getReportsData(fromDate, toDate) {

    let orders = [];

    const sheet = getSheet(SHEETS.ORDERS);

    const data = sheet.getDataRange().getValues();

    data.shift();

    let totalOrders = 0;
    let totalSales = 0;

    let todayOrders = 0;
    let todaySales = 0;
    let todayProfit = 0;

    const today = Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        "yyyy-MM-dd"
    );

    data.forEach(function (row) {

        const orderDate = Utilities.formatDate(
            new Date(row[1]),
            Session.getScriptTimeZone(),
            "yyyy-MM-dd"
        );

        const grandTotal = Number(row[10]) || 0;

        // KPI
        if (orderDate === today) {

            todayOrders++;

            todaySales += grandTotal;

        }

        // Date Range Summary
        if (fromDate && toDate) {

            if (orderDate >= fromDate && orderDate <= toDate) {

                totalOrders++;

                totalSales += grandTotal;

                orders.push({

                orderId: row[0],

                orderDate: Utilities.formatDate(
                
                new Date(row[1]),
              
                Session.getScriptTimeZone(),
              
                "dd/MM/yyyy"
    ),

    customer: row[2],

    mobile: row[3],

    paymentMode: row[8],

    paymentStatus: row[9],

    grandTotal: grandTotal

});
            }

        }

    });

   return {

    success: true,

    todaySales: todaySales,

    todayOrders: todayOrders,

    todayProfit: todayProfit,

    totalOrders: totalOrders,

    totalSales: totalSales,

    orders: orders

};

}