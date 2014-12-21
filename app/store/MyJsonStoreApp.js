/*
 * File: app/store/MyJsonStoreApp.js
 *
 */

Ext.define('DIAS.store.MyJsonStoreApp', {
    extend: 'Ext.data.Store',

    requires: [
        'DIAS.model.MyModelApp',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    config: {
        autoLoad: true,
        autoSync: true,
        model: 'DIAS.model.MyModelApp',
        storeId: 'MyJsonStoreApp',
        proxy: {
            type: 'ajax',
            url: 'http://www.dias.adm.br/teste/Dias_Crud_Ger/php/Mydb/SelectApp.php',
            reader: {
                type: 'json',
                rootProperty: 'dados'
            }
        },
        fields: ['id','app','table','url','ip','data']
    }
});