const { db } = require('../db/sql');
const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Sms_table = db.define('sms_table', {
    send_sms_id:{
        type: DataTypes.INTEGER(255),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    customer_id:{
        type: DataTypes.INTEGER(255),
        allowNull: true,
    },
    send_sms_to:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    send_sms_body:{
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    send_sms_service_name:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    send_sms_confimation:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    send_sms_error:{
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    createdBy:{
        type: DataTypes.INTEGER(255),
        allowNull: false,
        defaultValue: 0
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

db.sync();

module.exports=Sms_table;