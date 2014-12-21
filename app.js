/*
 * DiasCrudApp
 * Desenvolvido por Amarildo dias
 * www.dias.adm.br.
 */

// @require @packageOverrides
Ext.Loader.setConfig({

});

Ext.application({
    models: [
        'MyModelApp',
        'MyModelCrud',
        'MyModelList'
    ],
    stores: [
        'MyJsonStoreApp',
        'MyJsonStoreCrud',
        'MyJsonStoreList'
    ],
    views: [
        'MainView',
        'MyCrudList',
        'MyCrudDetails',
        'MyCrudForm'
    ],
    controllers: [
        'MyCruds'
    ],
    name: 'DIAS',

    launch: function() {

        Ext.create('DIAS.view.MainView', {fullscreen: true});
    }

});
