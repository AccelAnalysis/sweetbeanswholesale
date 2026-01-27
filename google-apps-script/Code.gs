/**
 * Google Apps Script for Sweet Beans Wholesale Website
 * 
 * Instructions:
 * 1. Go to script.google.com and create a new project.
 * 2. Paste this code into Code.gs.
 * 3. Deploy as a Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Select type: "Web app"
 *    - Description: "Production V1"
 *    - Execute as: "Me" (your account)
 *    - Who has access: "Anyone" (important for the website to send data)
 * 4. Copy the Web App URL and provide it to the website developer if different from the one provided.
 */

// Configuration
const SHEET_ID = "17pLID0SOZrOS1NUR8wXQMnf9hhA4oy0yOOwx9GNEJrs";
const NOTIFICATION_EMAIL = "sweetbeans@accelanalysis.com";

// Sheet Definitions
const SHEETS = {
  QUOTE_REQUESTS: {
    name: "Quote Requests",
    headers: ["Date", "Order ID", "Customer Name", "Email", "Phone", "Company", "Items", "Total Value", "Payment Preference", "Notes"]
  },
  APPLICATIONS: {
    name: "Wholesale Applications",
    headers: ["Date", "Status", "Business Name", "Type", "Contact Name", "Email", "Phone", "Address", "Volume", "Equipment", "Samples Requested", "Notes"]
  },
  INQUIRIES: {
    name: "General Inquiries",
    headers: ["Date", "Status", "Name", "Email", "Phone", "Message"]
  },
  SUBSCRIPTIONS: {
    name: "Email Subscriptions",
    headers: ["Date", "Email", "Status"]
  },
  RETAIL_ORDERS: {
    name: "Retail Orders",
    headers: ["Date", "Order ID", "Customer Name", "Company", "Email", "Phone", "Items", "Total Value", "Payment Preference", "Status", "Notes"]
  },
  JOB_APPLICATIONS: {
    name: "Job Applications",
    headers: ["Date", "Status", "Name", "Email", "Phone", "Position", "Experience", "Availability", "Resume Link", "Notes"]
  },
  // New Data Sheets
  CAFE_ITEMS: {
    name: "DB_CafeItems",
    headers: ["id", "categoryId", "name", "description", "price", "image", "videoUrl", "highlight", "page", "subpage", "note", "linkUrl"]
  },
  WHOLESALE_PRODUCTS: {
    name: "DB_WholesaleProducts",
    headers: ["id", "name", "origin", "roast", "notes", "acidity", "use", "sizes", "price", "image", "videoUrl", "page", "subpage", "linkUrl"]
  },
  RETAIL_PRODUCTS: {
    name: "DB_RetailProducts",
    headers: ["id", "name", "roast", "price", "image", "videoUrl", "page", "subpage", "linkUrl"]
  },
  SITE_ASSETS: {
    name: "DB_SiteAssets",
    headers: ["id", "page", "location", "type", "url", "alt", "linkUrl"]
  },
  HOME_FEATURED: {
    name: "DB_HomeFeatured",
    headers: ["id", "name", "description", "roast", "image", "fallbackImage"]
  }
};

/**
 * Handle GET requests - Serve the AppData JSON
 */
function doGet(e) {
  try {
    const data = getSiteData();
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle POST requests from the website
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.type; // 'quote', 'application', 'inquiry', 'sync_data'
    
    // Ensure workbook structure exists
    setupWorkbook();
    
    let result = {};
    
    if (type === 'quote') {
      result = handleQuoteRequest(data);
    } else if (type === 'application') {
      result = handleApplication(data);
    } else if (type === 'inquiry') {
      result = handleInquiry(data);
    } else if (type === 'subscription') {
      result = handleSubscription(data);
    } else if (type === 'retail') {
      result = handleRetailOrder(data);
    } else if (type === 'join_team') {
      result = handleJobApplication(data);
    } else if (type === 'sync_data') {
      result = handleSyncData(data.payload);
    } else {
      throw new Error("Unknown submission type: " + type);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data saved successfully",
      ...result
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Read all DB sheets and construct AppData
 */
function getSiteData() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  // Helper to read a sheet into an array of objects
  const readSheet = (configKey) => {
    const config = SHEETS[configKey];
    const sheet = ss.getSheetByName(config.name);
    if (!sheet) return [];
    
    const rows = sheet.getDataRange().getValues();
    if (rows.length < 2) return []; // Only headers
    
    const headers = rows[0];
    const data = rows.slice(1);
    
    return data.map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        // Convert boolean strings back to booleans
        let val = row[i];
        if (val === "true") val = true;
        if (val === "false") val = false;
        obj[h] = val;
      });
      return obj;
    });
  };

  return {
    cafeCategories: [ // Hardcoded categories for now, or add a DB_Categories sheet if needed
      { id: "combos", title: "Combos", icon: "Utensils" },
      { id: "coffee", title: "Coffee", icon: "Coffee" },
      { id: "not-coffee", title: "Not Coffee" },
      { id: "food", title: "The Food", icon: "Utensils" },
      { id: "goods", title: "The Goods", icon: "Gift" },
      { id: "merch", title: "Merch", icon: "ShoppingBag" },
      { id: "catering", title: "Catering", icon: "Utensils" },
      { id: "bouquets", title: "Bouquets & Strawberries", icon: "Gift" },
    ],
    cafeItems: readSheet("CAFE_ITEMS"),
    wholesaleProducts: readSheet("WHOLESALE_PRODUCTS"),
    retailProducts: readSheet("RETAIL_PRODUCTS"),
    siteAssets: readSheet("SITE_ASSETS"),
    homeFeaturedCoffees: readSheet("HOME_FEATURED")
  };
}

/**
 * Overwrite DB sheets with new data
 */
function handleSyncData(appData) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  // Helper to overwrite a sheet
  const writeSheet = (configKey, items) => {
    const config = SHEETS[configKey];
    let sheet = ss.getSheetByName(config.name);
    if (!sheet) {
      sheet = ss.insertSheet(config.name);
    } else {
      sheet.clear();
    }
    
    // Write headers
    sheet.appendRow(config.headers);
    sheet.getRange(1, 1, 1, config.headers.length).setFontWeight("bold").setBackground("#EFEFEF");
    sheet.setFrozenRows(1);
    
    if (!items || items.length === 0) return;
    
    // Map items to rows based on headers
    const rows = items.map(item => {
      return config.headers.map(h => {
        const val = item[h];
        return val === undefined || val === null ? "" : val;
      });
    });
    
    // Write data in bulk
    if (rows.length > 0) {
      sheet.getRange(2, 1, rows.length, config.headers.length).setValues(rows);
    }
  };
  
  writeSheet("CAFE_ITEMS", appData.cafeItems);
  writeSheet("WHOLESALE_PRODUCTS", appData.wholesaleProducts);
  writeSheet("RETAIL_PRODUCTS", appData.retailProducts);
  writeSheet("SITE_ASSETS", appData.siteAssets);
  writeSheet("HOME_FEATURED", appData.homeFeaturedCoffees);
  
  return { success: true };
}

/**
 * Ensure all required sheets and headers exist
 */
function setupWorkbook() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  Object.keys(SHEETS).forEach(key => {
    const config = SHEETS[key];
    let sheet = ss.getSheetByName(config.name);
    
    if (!sheet) {
      sheet = ss.insertSheet(config.name);
      sheet.appendRow(config.headers);
      // Format headers
      sheet.getRange(1, 1, 1, config.headers.length).setFontWeight("bold").setBackground("#EFEFEF");
      sheet.setFrozenRows(1);
    }
  });
}

/**
 * Handle Quote Request (Checkout)
 */
function handleQuoteRequest(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEETS.QUOTE_REQUESTS.name);
  
  const orderId = "QT-" + Math.floor(Math.random() * 100000);
  const date = new Date();
  
  // Format items for the cell
  const itemsString = data.items.map(item => 
    `${item.quantity}x ${item.name} (${item.size})`
  ).join("\n");
  
  sheet.appendRow([
    date,
    orderId,
    data.customerName,
    data.email,
    data.phone,
    data.company,
    itemsString,
    data.totalValue,
    data.paymentPreference,
    data.notes
  ]);
  
  sendNotification("New Quote Request", 
    `New quote request from ${data.customerName} (${data.company}).\nTotal: $${data.totalValue}\n\nItems:\n${itemsString}`);
    
  return { orderId: orderId };
}

/**
 * Handle Wholesale Application
 */
function handleApplication(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEETS.APPLICATIONS.name);
  
  const date = new Date();
  
  sheet.appendRow([
    date,
    "New",
    data.businessName,
    data.businessType,
    data.contactName,
    data.email,
    data.phone,
    data.address,
    data.volume,
    data.equipment,
    data.samples.join(", "),
    data.notes
  ]);
  
  sendNotification("New Wholesale Application", 
    `New application from ${data.businessName}.\nContact: ${data.contactName}\nEmail: ${data.email}`);
    
  return { id: "APP-" + Date.now() };
}

/**
 * Handle General Inquiry
 */
function handleInquiry(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEETS.INQUIRIES.name);
  
  const date = new Date();
  
  sheet.appendRow([
    date,
    "New",
    data.contactName,
    data.email,
    data.phone,
    data.message
  ]);
  
  sendNotification("New General Inquiry", 
    `New inquiry from ${data.contactName}.\nMessage: ${data.message}`);
    
  return { id: "INQ-" + Date.now() };
}

/**
 * Handle Email Subscription
 */
function handleSubscription(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEETS.SUBSCRIPTIONS.name);
  
  const date = new Date();
  
  sheet.appendRow([
    date,
    data.email,
    "Subscribed"
  ]);
  
  sendNotification("New Email Subscription", 
    `New subscription: ${data.email}`);
    
  return { id: "SUB-" + Date.now() };
}

/**
 * Handle Retail Order
 */
function handleRetailOrder(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEETS.RETAIL_ORDERS.name);
  
  const orderId = "RET-" + Math.floor(Math.random() * 100000);
  const date = new Date();
  
  // Format items for the cell
  const itemsString = data.items.map(item => 
    `${item.quantity}x ${item.name} (${item.size})`
  ).join("\n");
  
  sheet.appendRow([
    date,
    orderId,
    data.customerName,
    data.company,
    data.email,
    data.phone,
    itemsString,
    data.totalValue,
    data.paymentPreference,
    "Pending",
    data.notes
  ]);
  
  sendNotification("New Retail Order", 
    `New retail order ${orderId} from ${data.customerName}.\nTotal: $${data.totalValue}\n\nItems:\n${itemsString}`);
    
  return { orderId: orderId };
}

/**
 * Handle Job Application
 */
function handleJobApplication(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEETS.JOB_APPLICATIONS.name);
  
  const date = new Date();
  
  sheet.appendRow([
    date,
    "New",
    data.contactName,
    data.email,
    data.phone,
    data.position,
    data.experience,
    data.availability,
    data.resumeLink,
    data.notes
  ]);
  
  sendNotification("New Job Application", 
    `New application from ${data.contactName} for ${data.position}.\nEmail: ${data.email}`);
    
  return { id: "JOB-" + Date.now() };
}

/**
 * Send email notification
 */
function sendNotification(subject, body) {
  try {
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: `[Sweet Beans Web] ${subject}`,
      body: body + "\n\nView Sheet: https://docs.google.com/spreadsheets/d/" + SHEET_ID
    });
  } catch (e) {
    console.error("Failed to send email: " + e.toString());
  }
}