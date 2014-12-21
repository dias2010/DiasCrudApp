/*
 * File: app/view/MyModelCrudForm.js
 *
 */

Ext.define('DIAS.view.MyCrudForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.mycrudform',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Url',
        'Ext.Button'
    ],

    config: {
        items: [
            {
                xtype: 'fieldset',
                itemId: 'fieldset',
                items: []
            },
            {
                xtype: 'button',
                itemId: 'saveButton',
                margin: 10,
                ui: 'action',
                text: 'Save'
            }
        ]
    }

});