import { AuthState } from "../modules/auth/type"
import { CityState } from "../modules/city/type"
import { DashboardState } from "../modules/dashboard/type"
import { StudentFormState } from "../modules/student/screen/form/type"
import { StudentState } from "../modules/student/screen/list/type"


type AppState = {
    auth: AuthState,
    dashboard: DashboardState,
    student: StudentState,
    studentForm: StudentFormState,
    city: CityState
}

export default AppState
