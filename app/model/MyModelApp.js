/*
 * File: app/model/MyModelApp.js
 *
 */

Ext.define('DIAS.model.MyModelApp', {
    extend: 'Ext.data.Model',
    alias: 'model.mymodelapp',
    
    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: ['id','app','table','url','ip','data']
    }
});