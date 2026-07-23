/**
 * ==========================================
 * Initialize Business Costs
 * ==========================================
 */
function initializeBusinessCosts() {

    console.log("Business Costs Module Loaded");

}


/**
 * ==========================================
 * Open Business Cost Modal
 * ==========================================
 */
function openBusinessCostModal() {

    document.getElementById("businessCostModalTitle").innerText =
        "Add Business Cost";

    document.getElementById("businessCostRow").value = "";

    document.getElementById("costHead").value = "";

    document.getElementById("costAmount").value = "";

    document.getElementById("costUnit").value = "Per Order";

    document.getElementById("costActive").value = "Yes";

    document.getElementById("costRemarks").value = "";

    new bootstrap.Modal(
        document.getElementById("businessCostModal")
    ).show();

}