/*
 * File: app/controller/MyCruds.js
 *
 * 
 */

Ext.define('DIAS.controller.MyCruds', {
    extend: 'Ext.app.Controller',
    alias: 'controller.mycruds',

    requires: [
        'Ext.MessageBox'
    ],

    config: {
        refs: {
			main: 'mainview',
			navApp: 'mainview #menuapp',
			listApp: 'mainview #listapp',
			configPanel: 'mainview #configpanel',
            crudView: 'mainview #panelapp',
            crudNav: 'mainview mycrudlist',
            list: 'mainview mycrudlist #list',
            crudDetails: 'mainview mycrudlist mycruddetails',
            crudForm: 'mainview mycrudlist mycrudform',
            fieldset: 'mainview mycrudlist #fieldset',
            addButton: 'mainview #addButton',
            editButton: 'mainview #editButton',
            removeButton: 'mainview #removeButton',
            exibeModulos: 'mainview #exibeModulos'
        },

        control: {
        	"mainview #listapp": {
            	itemtap: 'selectApp'
        	},
        	"mainview mycrudlist #list": {
            	itemtap: 'selectRecord'
        	},
            "mainview #addButton": {
                tap: 'add'
            },
            "mainview #editButton": {
                tap: 'edit'
            },
            "mainview #saveButton": {
                tap: 'save'
            },
            "mainview #removeButton": {
                tap: 'remove'
            },
            "mainview #exibeModulos": {
                tap: 'exibeModulos'
            },
            "mainview mycrudlist > *": {
                show: 'setButtons'
            },
            "mainview #exibeconf": {
                tap: 'exibeConfig'
            },
            "mainview #saveconf": {
                tap: 'saveConfig'
            }
        }
        
    },
    saveConfig: function(){
    	this.getConfigPanel().hide();
    	this.getListApp().show();
    },
    
    exibeConfig: function(){    	
    	this.getListApp().hide();
    	this.getConfigPanel().show();
    },
    
    exibeModulos: function(){
    	window.location.href = 'index.html';
    },
    
    
    //Carrega dados da app escolhida 
    selectApp: function(dataview, index, target, record, e, eOpts) {   
    	var me = this;
    	var tab = record.get('table'); 
    	urlapp = record.get('url');
    	app = record.get('app');
    	me.getCrudView().show();
        var url = urlapp+'config/json/'+tab+'.php';         
        var storeApp = Ext.create('DIAS.store.MyJsonStoreCrud',{});
        storeApp.getProxy().setUrl(url);
        storeApp.load({params: {},
        callback: function() { 
        	var dataApp = storeApp.getProxy().getReader().rawData;        	
        	if (dataApp){
        		var columns = [];
        	   	fields = [];
        	   	items = [];
                tablename = dataApp.tablename;
                var chave = dataApp.chave; 
                var columns = dataApp.columns;
                fields = dataApp.fields;
                items = dataApp.items;                
 
                //build list itemtpl
                var endfields = fields.length;
                var new_list = '';
                var line_init = '<div>';
                var line_end = '</div>';
                for (k=0;k<endfields;k++){
        			var item = fields[k];
         			if (k<endfields){
         				var add_line = '<div><label>'+item+':</label><span><font color="#0000FF">{'+item+'}</span></font></div>';
         				new_list += add_line;
        			}else{
        				Ext.Msg.alert('Ok', 'Erro ao montar list');
         			}
    			}//end for
                
                item_tpl = [];                 
                item_tpl = [line_init+new_list+line_end];

                //Chamada da Funcao para Popular List 
                me.listData(tablename, fields, chave, item_tpl, items, urlapp);
                
        	}else{
        		Ext.Msg.alert('Info', 'App nao localizada, clique em [config] e verifique se o caminho esta correto.');
        	}
        }});
    },
    
    
    //Populando List
    listData: function(tablename, fields, chave, item_tpl, items, urlapp){
    	var me = this;
    	var campos = Ext.encode(fields);
		var url = urlapp+'config/php/Select.php'; 	
        var mdList = "";
		mdList = Ext.define('DIAS.model.MyModelList',{extend: 'Ext.data.Model', config:{fields: fields}});
		var stores = Ext.create('DIAS.store.MyJsonStoreList', {extend: 'Ext.data.Store', config: {model: mdList, fields: fields}});
			stores.getProxy().setUrl(url);
			stores.load({params: {
				Campos: campos,
				Tablename: tablename,
				Chave: chave,
				start: 0,
				limit: 500,
				pageSize: 10,
				Field0: chave
			}, 
			callback: function() {
				me.addListView();
				me.addList(item_tpl, stores);
		    }});
	},
	
	//adiciona dataview
	addListView: function(dataview, index, target, record, e, eOpts){
		var me = this;
		me.getNavApp().hide();
		me.getCrudView().add({
			xtype:'mycrudlist',
			itemId: 'mylist'
		});
	},
	
	//adiciopna list
	addList: function(item_tpl, stores){
		var me = this;
		var title = '['+app+']-Listando';
		me.getCrudNav().push({
    		xtype: 'list',
    		title: title,
    	    itemId: 'list',
            striped: true,
    		itemTpl: item_tpl,
    		store: stores
    	});
	},
    
    //Show details
    selectRecord: function(dataview, index, target, record, e, eOpts){
    	var me = this;
    	var title = '['+app+']-Detalhes';
        me.getCrudNav().push({
            xtype: 'mycruddetails',
            title: title,
            itemId: 'mydetails',
            tpl: item_tpl,
            record: record
        });
        
    },
    
    addItemsForm: function(){
    	var me = this;
        Ext.each(items, function(op) {
			var new_field = {	
   				xtype: 'textfield',//op.xtype,
   				name: op.id,
   				label: '<font color="#0000FF">'+op.fieldLabel+':</font>'
			};
			me.getFieldset().add(new_field);
		});    	
    },    

    add: function() {
    	var me = this;
    	var title = '['+app+']-Adicionando';
    	// Remove current selection
        me.getList().deselectAll();
   		//add form
        me.getCrudNav().push({
        	xtype: 'mycrudform',
            itemId: 'myform',
            title: title,
            record: Ext.create('model.mymodellist')
        });
        me.addItemsForm();
        insert = true;
    },

    edit: function() {
    	var me = this;
    	var title = '['+app+']-Editando';
        var record = me.getList().getSelection()[0];        
        me.getCrudNav().push({
        	xtype: 'mycrudform',
            itemId: 'myform',
            title: title,
            record: record
        }); 
        me.addItemsForm();        
        me.getCrudForm().setRecord(record);
        insert = false;
    },

    save: function() { 
    	var me = this;
		var valores = [];
		var form = this.getCrudForm();
		var key = fields[0];
		valores = form.getValues();
		
		//if(form.getForm().isValid()){
		
		   //INSERT
		   if (insert === true){			 
			 var val1 = '';
		  	 Ext.Ajax.request({
			    url: urlapp+'config/php/Insert.php',
			    method: 'POST',
				params: {
					Tablename: tablename,
					Chave: key,
					Field1: key,
	  	 			Val1: val1,    	  	 				 
	  	 			Fields: Ext.encode(fields),
	  	 			Valores: Ext.encode(valores),
	  	 			Length: fields.length
	  	 		},
				success: function(){

				},
				failure: function(){
					
				},
				scope: this
			})
		  }//fim insert
		   
		  //UPDATE
		   if (insert === false){
			    var record = me.getList().getSelection()[0];  
				var val1 = record.data['id'];
				Ext.Ajax.request({
				    url: urlapp+'config/php/Update.php',
				    method: 'POST',
					params: {
						Tablename: tablename,
						Chave: key,
						Field1: key,
 	  	 				Val1: val1,    	  	 				 
 	  	 				Fields: Ext.encode(fields),
 	  	 				Valores: Ext.encode(valores),
 	  	 				Length: fields.length
 	  	 			},
					success: function(){

					},
					failure: function(){

					},
					scope: this
				})
		  }		   
	  //}else{
		  //Ext.Msg.alert('Atencao', 'Existem campos invalidos.');
	  //}	   

	  //Atualiza list view 
        var form = this.getCrudForm(),
            record = form.getRecord(),
            store = Ext.getStore('MyJsonStoreList');
        form.updateRecord(record);
        var errors = record.validate();
        if (errors.isValid()) {
            if (record.phantom) {
                var id = store.getData().all.length + 1;
                record.set('id', id);
                store.add(record);
            }
            store.sync();
            this.getCrudNav().reset(record);
        }
        else {
            var msg = '';
            errors.each(function (error) {
                msg += error.getMessage() + '<br/>';
            });
            Ext.Msg.alert('Error', msg);
        }
    },

    remove: function() {
        var me = this,
            title = 'Delete',
            message = 'Excluir o registro selecionado?';

        // Show confirmation message
        Ext.Msg.confirm(title, message, function(response) {
            if (response == 'yes') {
            	// Remove record do db
            	var key = fields[0];
			    var record = me.getList().getSelection()[0];  
				var val1 = record.data['id'];
				Ext.Ajax.request({
				    url: urlapp+'config/php/Delete.php',
				    method: 'GET',
					params: {
						Tablename: tablename,
						Chave: key,
						Field1: key,
 	  	 				Val1: val1
 	  	 			},
					success: function(){

					},
					failure: function(){

					},
					scope: this
				})
		  
                // Remove record da view
                var store = Ext.getStore('MyJsonStoreList'),
                    record = me.getList().getSelection()[0];
                store.remove(record);

                // Back to list view
                store.sync();
                me.getCrudNav().reset();

            }
        });
    },


    setButtons: function(component) {
        // Hide/Show buttons based on view

        var add = this.getAddButton(),
            edit = this.getEditButton(),
            remove = this.getRemoveButton(),
            exibe = this.getExibeModulos();

        switch (component.getItemId()) {
            case 'mylist':
                add.show();
                edit.hide();
                remove.hide();
                exibe.show();
                break;
            case 'mydetails':
                add.hide();
                edit.show();
                remove.show();
                exibe.show();
                break;
            case 'myform':
                add.hide();
                edit.hide();
                remove.hide();
                exibe.show();
                break;
        }
    }

});