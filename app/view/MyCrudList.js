/*
 * File: app/view/MyCruds.js
 */

Ext.define('DIAS.view.MyCrudList', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mycrudlist',

    requires: [
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.navigation.Bar',
        'Ext.Button'
    ],

    config: {
		layout: {
    		type: 'card',
    		animation: 'slide'
		},
	    items: [],
		navigationBar: {
            docked: 'top',
            items: [
                        {
                            xtype: 'button',
                            hidden: false,
                            itemId: 'exibeModulos',
                            text: 'modulos'
                        },
                        {
                            xtype: 'button',
                            hidden: false,
                            itemId: 'addButton',
                            text: 'add'
                            //iconCls: 'add'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'editButton',
                            text: 'Edit'
                            //iconCls: 'compose'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'removeButton',
                            text: 'Delete'
                            //iconCls: 'delete'
                        }
                    ]
            }

}});