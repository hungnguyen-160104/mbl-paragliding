/* eslint-disable */
// @ts-nocheck
// This file is meant to be deployed in Google Apps Script, not run in Node.js
// SpreadsheetApp and ContentService are global objects provided by Google Apps Script runtime

// Google Apps Script code to deploy as a web app
// This should be deployed in Google Apps Script and the URL should be added to NEXT_PUBLIC_GOOGLE_SCRIPT_URL

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    // Parse the JSON payload
    const data = JSON.parse(e.postData.contents)

    // Prepare row data
    const timestamp = new Date(data.timestamp)
    const mainGuest = data.guests[0]

    const optionsList = []
    if (data.options.transfer) optionsList.push("Đưa đón")
    if (data.options.flycam) optionsList.push("Flycam")
    if (data.options.luggage) optionsList.push("Hành lý")

    const row = [
      timestamp,
      data.guestCount,
      mainGuest.name,
      mainGuest.phone,
      mainGuest.email,
      mainGuest.date,
      mainGuest.timeSlot,
      mainGuest.pickup || "",
      optionsList.join(", "),
      data.discountCode || "",
      data.subtotal,
      data.discountAmount,
      data.total,
      mainGuest.note || "",
      // Add all guests info as JSON string
      JSON.stringify(data.guests),
    ]

    // Append the row
    sheet.appendRow(row)

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Booking recorded successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet() {
  return ContentService.createTextOutput("MBL Paragliding Booking API is running")
}

// Setup function to create headers (run this once manually)
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  const headers = [
    "Timestamp",
    "Số khách",
    "Tên khách chính",
    "Số điện thoại",
    "Email",
    "Ngày bay",
    "Khung giờ",
    "Điểm đón",
    "Dịch vụ thêm",
    "Mã giảm giá",
    "Tạm tính",
    "Giảm giá",
    "Tổng cộng",
    "Ghi chú",
    "Chi tiết khách (JSON)",
  ]
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold")
}
