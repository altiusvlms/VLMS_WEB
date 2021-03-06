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
    ADDRESS = 'fineract-provider/api/v1/customers/address',
    ANALYTICS_TOTAL_COUNT = 'fineract-provider/api/v1/customers/branchAnalytic?command=loanApplications',
    ANALYTICS_ENQUIRY = 'fineract-provider/api/v1/customers/branchAnalytic?command=enquiry',
    ANALYTICS_CUS_ONBOARD = 'fineract-provider/api/v1/customers/branchAnalytic?command=customerOnboard',
    ANALYTICS_OVERALL_DATA = 'fineract-provider/api/v1/Branch/getBranchAnalyticsData',
    GET_DOCUMENT_DETAILS = 'fineract-provider/api/v1/fieldExecutive/getDocuments',
    GET_DOCUMENT_IMAGE  = 'fineract-provider/api/v1/fieldExecutive/getDocumentsData',
    DASHBOARD_STATUS = 'fineract-provider/api/v1/Cashier/getCashierAnalyticsData',
    ROLES ='fineract-provider/api/v1/roles',
    PERMISSION = 'fineract-provider/api/v1/permissions',
    CASHIER_TASK = 'fineract-provider/api/v1/Cashier',
    HL_PAYMENT = 'fineract-provider/api/v1/Cashier',
    VOUCHER = 'fineract-provider/api/v1/Cashier',
    MY_TASK = 'fineract-provider/api/v1/Cashier',
    APPROVEL = 'fineract-provider/api/v1/loans/',
    LOAN_TRANSFER_TEAM = 'fineract-provider/api/v1/loanTransfer'
}



export { appModels }