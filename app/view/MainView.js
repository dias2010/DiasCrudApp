/*
 * File: app/view/MainView.js
 *
 */

Ext.define('DIAS.view.MainView', {
    extend: 'Ext.Container',
    alias: 'widget.mainview',

    requires: [
        'Ext.Toolbar',
        'Ext.dataview.DataView',
        'Ext.dataview.List',
        'Ext.navigation.Bar',
        'Ext.XTemplate',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.Button',
        'Ext.field.Select'
    ],

    config: {
        layout: 'fit',
        itemId: 'mainapp',
        items: [
            {
                xtype: 'container',
                flex: 1,
                itemId: 'menuapp',
                layout: 'fit',
                hidden: false,
                scrollable: true,
                items: [
                    {
                        xtype: 'list',
                        itemId: 'listapp',
                        itemTpl: [
                            '<div><center>{app}</center></div>'
                        ],
                        store: 'MyJsonStoreApp'
                    },{
                        xtype: 'panel',
                        hidden: true,
                        itemId: 'configpanel',
                        items: [{
                        	xtype: 'label',
                        	html: '<center>App DiasCrudApp utilizada para testar modulos gerados no aplicativo http://www.dias.adm.br/teste/Dias_Crud_Ger/index.html. </p>Acesse o site e gere um aplicativo para fazer o seu teste. </p>O aplicativo gerador possibilita criar tabela e gerar as configuracoes necessarias para acesso por meio dessa app.</p>Apos gerada, sua app ira aparecer na lista de modulos.</p>Caso queira uma copia do codigo fonte para customizar envie e-mail para:</p> dias@dias.adm.br </center>'
                        },{
                            xtype: 'button',
                            itemId: 'saveconf',
                            margin: 10,
                            text: 'Voltar'
                        }],

                    },{
                        xtype: 'toolbar',
                        docked: 'top',
                        title: '[DiasCrudApp]-Modulos',
                        items:[{
                        	xtype: 'button',
                        	itemId: 'exibeconf',
        					text   : 'Info'
        				}]
                    },
                ]
            	},{
                xtype: 'container',
                itemId: 'panelapp',
                flex: 4,
                hidden: true,
                layout: 'fit',
                items: []
            }
       ]
    }

});