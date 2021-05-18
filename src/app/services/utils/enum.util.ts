enum appModels {
    AUTH = 'auth',
    FIELDEXECUTIVE = 'fineract-provider/api/v1/fieldExecutive',
    USERS = 'fineract-provider/api/v1/users',
    CUSTOMERS = 'fineract-provider/api/v1/customers',
    ENROLL = 'fineract-provider/api/v1/fieldExecutive/enroll',
    LOANPROCESS = 'fineract-provider/api/v1/fieldExecutive/applyLoan',
    NEWLOAN = 'fineract-provider/api/v1/fieldExecutive/newApplicantLoan',
    IMAGES = 'fineract-provider/api/v1/images',
    COMMON = 'fineract-provider/api/v1',
    CREATEEMPLOYEE = 'fineract-provider/api/v1/Employee/createEmployee',
    EMPLOYEE = 'fineract-provider/api/v1/Employee',
    GETEMPLOYEE = 'fineract-provider/api/v1/Employee/getEmployees',
    ANALYTICS_TOTAL_COUNT = 'fineract-provider/api/v1/customers/branchAnalytic?command=loanApplications',
    ANALYTICS_ENQUIRY = 'fineract-provider/api/v1/customers/branchAnalytic?command=enquiry',
    ANALYTICS_CUS_ONBOARD = 'fineract-provider/api/v1/customers/branchAnalytic?command=customerOnboard',
    ANALYTICS_OVERALL_DATA = 'fineract-provider/api/v1/Branch/getBranchAnalyticsData'

}



export { appModels }