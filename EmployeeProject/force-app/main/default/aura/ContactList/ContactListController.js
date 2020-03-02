({
    doView : function(component, event, helper) {
        var btnvalue= event.getSource().get('v.value');
        $A.createComponent('c:RecordForm',
           {
              "recordObj":btnvalue
           },
           function(recordForm,status,errorMessage){
             if(status==='SUCCESS'){
                  component.find('overLayLib').showCustomModal({
                   header:'Employee Details',
                   body:recordForm,
                   footer:'footer',
                   showCloseButton:true,
                   
                 });
             }
           }
        )
    },
   doEdit : function(component, event, helper) {
    var btnvalue= event.getSource().get('v.value');
    $A.createComponent('c:RecordFormEdit',
       {
          "recordObj":btnvalue
       },
       function(recordFormEdit,status,errorMessage){
         if(status==='SUCCESS'){
              component.find('overLayLib').showCustomModal({
               header:'Employee Details',
               body:recordFormEdit,
               footer:'footer',
               showCloseButton:true,
               
             });
         }
       }
    )    
 


    },
    handleAction : function(component, event, helper) {
     var action=component.get("c.getList");
     action.setParams({

     });
     action.setCallback(this,function(response){
        var state=response.getState();
        if(state==='SUCCESS' || state==='DRAFT'){
            var responseValue=response.getReturnValue();
            component.set('v.employeeList',responseValue);
        }
       else {
           alert('Problem in Fetching');
       }

     },'ALL')
     $A.enqueueAction(action);

    },
    handleEvent : function(component, event, helper) {
        
       
       component.set('v.EmployeeObject.Name',event.getParam("newName"));
       component.set('v.EmployeeObject.Email__c',event.getParam("newEmail"));
       component.set('v.EmployeeObject.Phone__c',event.getParam("newPhone"));
       


       var employeeList=component.get('v.employeeList');
        employeeList.push(component.get('v.EmployeeObject'));
        component.set('v.employeeList',employeeList);
        


    }
})
