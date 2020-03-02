({
    doInit : function(component, event, helper) {
         var actions=[{
             label: "Show Details", 
             name: "show_details",
             iconName:"action:preview"
         },
         {
            label: "Delete", 
            name: "delete",
            iconName:"action:delete"
        },
        {
            label: "Edit", 
            name: "edit",
            iconName:"action:new_note"
        },
        {
            label: "Add", 
            name: "add",
            iconName:"standard:account"
        }]; 
        component.set('v.columns', [
            {label: 'Name', fieldName: 'Name', type: 'text',editable:true},
            {label: 'Phone', fieldName: 'Phone__c', type: 'text',editable:true},
            {label: 'Email', fieldName: 'Email__c', type: 'text',editable:true},
            {type:"action", typeAttributes: {rowActions:actions}}
        ]);
        var action=component.get('c.getList');
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state==='SUCCESS'){
                 var responseValue=response.getReturnValue();
                component.set('v.data',responseValue);
            } 
          
        });
        $A.enqueueAction(action);
    },
    handleRowAction : function(component, event, helper) {
        var action=event.getParam('action');
        var row= event.getParam('row');
         switch(action.name){
            case 'show_details':
                $A.createComponent("c:RecordViewForm", {
                    "id" : row.Id
                },
             function(content, status) {
                 if (status === "SUCCESS") {
                     
                     component.find('overlayLib').showCustomModal({
                         header: "View Record",
                         body: content,
                         showCloseButton: true,
                         cssClass: "mymodal",
                         closeCallback: function() {
                             alert('You closed the alert!');
                         }
                     })
                 }
             });
            break;
            
            case 'edit':
            
              $A.createComponent("c:RecordEditForm", {
                  "id" : row.Id
              },
           function(content, status) {
               if (status === "SUCCESS") {
                   
                   component.find('overlayLib').showCustomModal({
                       header: "Edit Record",
                       body: content,
                       showCloseButton: true,
                       cssClass: "mymodal",
                       closeCallback: function() {
                           
                       }
                   })
               }
           });


            break;
                
            case 'delete':
               var data=component.get("v.data");
               var index=data.indexOf(row);
               data.splice(index,1);
               component.set('v.data',data);
               break;
         }



    }
})
