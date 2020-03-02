({
    
    recordUpdated: function(component, event, helper) {
        var count=parseInt(component.get('v.counter'));
        if(count==0){
        component.find("recordRemover").deleteRecord($A.getCallback(function(deleteResult){
            if(deleteResult.state==='SUCCESS' || deleteResult.state==='DRAFT'){
                      alert('delete Done !!!');
            }
             else{
                 alert('Problem');
             }
         }));
        count++;
        component.set('v.counter',count)
        }
        if(count==1){
        var homeEvt = $A.get("e.force:navigateToObjectHome");
        homeEvt.setParams({
         "scope": "Employee__c"
        });
        homeEvt.fire();
    }
    }
})
