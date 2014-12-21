/*
 * File: app/store/MyJsonStoreCrud.js
 *
 */

Ext.define('DIAS.store.MyJsonStoreCrud', {
    extend: 'Ext.data.Store',

    requires: [
        'DIAS.model.MyModelCrud',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    config: {
        autoLoad: false,
        model: 'DIAS.model.MyModelCrud',
        storeId: 'MyJsonStoreCrud',
        proxy: {
            type: 'ajax',
            url:'',
            reader: {
                type: 'json'
            }
        },
        fields: []
    }
});