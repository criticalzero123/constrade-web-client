import Swal from "sweetalert2";
import api from "../utilities/api";

export default function useReport() {
  const reportById = async (userId, id, reportType) => {
    try {
      const info = {
        reportedBy: userId,
        idReported: id,
        reportType: reportType,
        description: "Something dummy coming from function",
        dateSubmitted: new Date(),
      };

      const res = await api.setAuthHeaders().post("/api/report", info);

      if (res.data.responseData)
        Swal.fire("Reported!", "Your report has been received!", "success");
    } catch (error) {
      alert(error);
    }
  };

  return { reportById };
}
