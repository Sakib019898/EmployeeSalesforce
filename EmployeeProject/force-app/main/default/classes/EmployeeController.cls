public with sharing class EmployeeController {
    @AuraEnabled
    public static string insertData(String name,String phn,String email){
        Employee__c emp=new Employee__c (Name=name,Phone__c=phn,Email__c=email);
        insert emp;
        return name;
    }
    @AuraEnabled
    public static Employee__c[] getList(){
        Employee__c[] emp=([Select Name,Phone__c,Email__c from Employee__c]);
        return emp;
    }
    @AuraEnabled
    public static Employee__c[] getName(){
        Employee__c[] emp=([Select Name,Id from Employee__c]);
        return emp;
    }
    @AuraEnabled
    public static Employee__c getEmployeeInfo(String name){
        Employee__c emp=([Select Name,Email__c,Phone__c from Employee__c where Name=:name]);
        return emp;
    }
    @AuraEnabled
    public static void updateEmployee(String name,String newName,String phn,String email){
        Employee__c emp=([Select Name,Email__c,Phone__c from Employee__c where Name=:name]);
        emp.Name=newName;
        emp.Email__c=email;
        emp.Phone__c=phn;
        update emp;
        
    }
    @AuraEnabled
    public static String doDelete(String name){
        Employee__c[] emp=([Select Name,Email__c,Phone__c from Employee__c where Name=:name]);
        delete emp;
        return name;
    }
    
    
}
