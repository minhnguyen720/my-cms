import { errorNotification } from "@/hooks/notifications/notificationPreset";
import useLoading from "@/hooks/utilities/useLoading";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

export const useBackToPage = () => {
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();
  const params = useParams();

  const backToPageOverall = () => {
    try {
      showLoading();
      router.push(`/application/project/${params.projectNameId}`);
    } catch (error) {
      errorNotification("Something went wrong. Moving back to Dashboard.");
      router.push("/application/dashboard");
    } finally {
      hideLoading();
    }
  };

  return {
    backToPageOverall
  }
};
