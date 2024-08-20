import XLSX from 'xlsx';
import ProductList from "../models/ProductList.js";





export const insertProductsFromExcel = async (req, res) => {
    const filePath = req.body.filePath;

    if (!filePath) {
        return res.status(400).json({ success: false, message: 'filePath is required' });
    }

    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        console.log('Data from Excel:', data); // Log the data

        const categories = [];
        let currentCategory = null;
        let currentSubcategory = null;

        for (const item of data) {
            const name = item.Name ? item.Name.trim() : null;

            if (!name) {
                continue; // Skip empty rows
            }

            if (!name.endsWith(":")) {
                // It's a category
                currentCategory = name;
                currentSubcategory = null; // Reset subcategory
            } else {
                // It's a subcategory
                currentSubcategory = name.slice(0, -1); // Remove the colon
            }

            // If it's not a category or subcategory, it's a product
            if (currentCategory && currentSubcategory) {
                categories.push({
                    category: currentCategory,
                    subcategory: currentSubcategory,
                    product: name
                });
            }
        }

        console.log('Categories array:', categories); // Log the categories

        // Insert data into the database
        await ProductList.insertMany(categories);

        return res.status(200).json({ success: true, message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Error inserting data' });
    }
};
