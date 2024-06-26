const dbConfig = require('../config/dbconfig');
let eventRegModel = module.exports = {
    addEventReg: async function (params) {
        try {
            console.log(params)
            let replacements = [params.name, params.designation, params.email, params.phoneNo, params.instituteName, 0, '1'];
            console.log(replacements)
            let sql = 'INSERT INTO `event_registration` (`full_name`, `designation`, `mailid`, `contactno`, `institution_name`, `ticket`, `member_or_not`) VALUES (?, ?, ?, ?, ?, ?, ?);';
            const [rows] = await dbConfig.pool.query(sql, replacements);
            if (rows.affectedRows > 0) {
                return { status: true };
            } else {
                return { status: false };
            }
        } catch (err) {
            console.log(err)
            return { status: false };
        }
    },
    updateEventReg: async function (params) {
        try {
            console.log(params.preferences)
            // Base query
            let sql = 'UPDATE event_registration SET';
            let conditions = [];
            let replacements = [];
            if(params.preferences){
                conditions.push(' check_list = ?');
                replacements.push('1');
            }
            // Check and add conditions based on provided params
            if (params.preferences.datePreferences[0].date === '2024-09-27') {
                conditions.push(' food_type = ?');
                replacements.push(params.preferences.datePreferences[0].veg);
            }
            if (params.preferences.datePreferences[1].date === '2024-09-28') {
                conditions.push(' food_type = ?');
                replacements.push(params.preferences.datePreferences[1].veg);
            }
            if (params.preferences.datePreferences[2].date === '2024-09-29') {
                conditions.push(' food_type = ?');
                replacements.push(params.preferences.datePreferences[2].veg);
            }
            if (params.preferences.foodType !== undefined) {
                conditions.push(' food_type = ?');
                replacements.push(params.preferences.foodType);
            }
            if (params.preferences.drinkStatus !== undefined) {
                conditions.push(' drink_status = ?');
                replacements.push(params.preferences.drinkStatus);
            }
            if (params.payCheck !== undefined) {
                conditions.push(' payment_status = ?');
                replacements.push(params.payCheck);
            }
            if (params.orderId !== undefined) {
                conditions.push(' rozerpay_orderid = ?');
                replacements.push(params.orderId);
            }
            if (params.amount !== undefined) {
                conditions.push(' pay_amount = ?');
                replacements.push(params.amount);
            }
            if (params.status !== undefined) {
                conditions.push(' status = ?');
                replacements.push(params.status);
            }
            // Add the email parameter to the WHERE clause
            sql += conditions.join(',') + ' WHERE mailid = ?';
            replacements.push(params.email);
        
            // Execute the query
            const [rows] = await dbConfig.pool.query(sql, replacements);
            if (rows.affectedRows > 0) {
                return { status: true };
            } else {
                return { status: false };
            }
        } catch (error) {
            // Handle error
            console.error(error);
            return { status: false, error: error.message };
        }        
    },
    getEventReg: async function (params) {
        try {
            let replacements = [params.email];
            let sql = 'SELECT name, designation, phone_no, email, inst_no, status, mem_type, pay_check from event_reg where email = ?'
            const [rows] = await dbConfig.pool.query(sql, replacements);
            if (rows.length > 0) {
                return { status: true, data: rows };
            } else {
                return { status: false };
            }
        } catch (err) {
            return { status: false };
        }
    }
}