/**
 * ==========================================
 * Get Reports Data
 * ==========================================
 */
function getReportsData(fromDate, toDate) {

    let orders = [];

    // ==========================================
    // Sheets
    // ==========================================
    const sheet = getSheet(SHEETS.ORDERS);
    const orderItemsSheet = getSheet(SHEETS.ORDER_ITEMS);
    const menuSheet = getSheet(SHEETS.MENU);

    // ==========================================
    // Orders Data
    // ==========================================
    const data = sheet.getDataRange().getValues();
    data.shift();

    // ==========================================
    // Order Items Data
    // ==========================================
    const orderItems = orderItemsSheet.getDataRange().getValues();
    orderItems.shift();

    // ==========================================
    // Menu Data
    // ==========================================
    const menuData = menuSheet.getDataRange().getValues();
    menuData.shift();

    // ==========================================
    // Menu Cost Lookup
    // ==========================================
    const menuCostMap = {};

    menuData.forEach(function(row){

        const menuItem = String(row[1]).trim();

        menuCostMap[menuItem] = {

            cost: Number(row[3]) || 0

        };

    });

    // ==========================================
    // Variables
    // ==========================================
    let totalOrders = 0;
    let totalSales = 0;

    let totalCost = 0;
    let grossProfit = 0;

    let todayOrders = 0;
    let todaySales = 0;
    let todayProfit = 0;

    const today = Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        "yyyy-MM-dd"
    );

    // ==========================================
    // Process Orders
    // ==========================================
    data.forEach(function(row){

        const orderDate = Utilities.formatDate(
            new Date(row[1]),
            Session.getScriptTimeZone(),
            "yyyy-MM-dd"
        );

        const grandTotal = Number(row[10]) || 0;

        // Today's KPI
        if(orderDate === today){

            todayOrders++;

            todaySales += grandTotal;

        }

        // Selected Date Range
        if(orderDate >= fromDate && orderDate <= toDate){

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

    });

    grossProfit = totalSales - totalCost;

    return {

        success: true,

        todaySales: todaySales,

        todayOrders: todayOrders,

        todayProfit: todayProfit,

        totalOrders: totalOrders,

        totalSales: totalSales,

        totalCost: totalCost,

        grossProfit: grossProfit,

        orders: orders

    };

}