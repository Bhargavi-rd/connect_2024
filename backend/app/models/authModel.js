const dbConfig = require('../config/dbconfig');
let authModel = module.exports = {
    getUser: async function (params) {
        try {
            let replacements = [params.email];
            const [rows] = await dbConfig.pool.query('select email, designation, contact_no AS "contactNo", inst_name AS "instituteName", status from institute_table where email = ?;', replacements);
            const [result] = await dbConfig.pool.query('select member_or_not AS "mem" from event_registration where mailid = ?;', replacements);
            console.log("rows",rows)
            console.log("result",result)
            if (rows.length > 0 && result.length > 0) {
                return { status: true, data:{ rows:rows[0] , result:result[0]} };
            } else {
                return { status: false };
            }
        } catch (err) {
            console.log(err)
            return { status: false };
        }
    }
}