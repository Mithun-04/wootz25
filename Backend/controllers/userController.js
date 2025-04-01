const { GoogleSpreadsheet } = require("google-spreadsheet");
const { GoogleAuth } = require("google-auth-library");
const creds = require("../config/google-credentials.json"); // Google service account credentials
const User = require("../models/User");

exports.exportUsersToGoogleSheet = async (req, res) => {
    const SHEET_ID = "1o0r2ZGb2llB842rJ6y5blEHGlxZXDk0utLE1NnUNJdE";

    try {
        // Initialize the GoogleSpreadsheet instance
        const doc = new GoogleSpreadsheet(SHEET_ID);

        // Create a GoogleAuth client and set the credentials
        const auth = new GoogleAuth({
            credentials: {
                client_email: creds.client_email,
                private_key: creds.private_key.replace(/\\n/g, "\n"), // Ensure proper formatting of private key
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"], // Required scope for Google Sheets
        });

        // Authenticate and get the auth client
        const authClient = await auth.getClient();

        // Pass the auth client directly to the GoogleSpreadsheet instance
        doc.auth = authClient;

        // Load the document information
        await doc.loadInfo();

        // Access the first sheet
        const sheet = doc.sheetsByIndex[0];

        // Clear existing data but preserve the header row
        const rows = await sheet.getRows(); // Fetch all rows
        if (rows.length > 1) {
            // Delete rows one by one, starting from the last row
            for (let i = rows.length - 1; i >= 0; i--) {
                await rows[i].delete();
            }
        }

        // Ensure the header row exists
        const headerValues = ["Name", "Email", "Phone"];
        if (!sheet.headerValues || sheet.headerValues.length === 0) {
            await sheet.setHeaderRow(headerValues); 
        }

        const users = await User.find().select("name email phone");

        const formattedRows = users.map(user => ({
            Name: user.name,
            Email: user.email,
            Phone: user.phone || "N/A",
        }));

        // Add rows to the sheet
        await sheet.addRows(formattedRows);

        res.status(200).json({ message: "Users exported successfully to Google Sheets" });

    } catch (error) {
        console.error("Error exporting users:", error);
        res.status(500).json({ message: "Server error" });
    }
};