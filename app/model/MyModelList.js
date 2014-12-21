/*
 * File: app/model/MyModelApp.js
 *
 */

Ext.define('DIAS.model.MyModelList', {
    extend: 'Ext.data.Model',
    alias: 'model.mymodellist',
    
    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: []
    }
});