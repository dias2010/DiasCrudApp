/*
 * File: app/store/MyJsonStoreCrud.js
 *
 */

Ext.define('DIAS.store.MyJsonStoreList', {
    extend: 'Ext.data.Store',

    requires: [
        'DIAS.model.MyModelList',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    config: {
        autoLoad: false,
        model: 'DIAS.model.MyModelList',
        storeId: 'MyJsonStoreList',
        proxy: {
            type: 'ajax',
            url:'',
            reader: {
                type: 'json',
                rootProperty: 'dados'
            }
        },
        fields: []
    }
});