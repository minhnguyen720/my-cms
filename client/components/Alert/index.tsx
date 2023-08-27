import { activeAlertAtom } from "@/atoms";
import { Transition } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import useAlert from "./hooks";

interface Props {}

const Alert: React.FC<Props> = () => {
  const [alert, setAlert] = useAtom(activeAlertAtom);
  const { closeAlert } = useAlert();
  // useEffect(() => {
  //   if (alert.activeFlag) {
  //     try {
  //       console.log("alert open");
  //       setTimeout(() => {
  //         closeAlert();
  //         console.log("alert close");
  //       }, 2000);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }, [alert.activeFlag, closeAlert, setAlert]);

  return (
    <Transition
      mounted={alert.activeFlag}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <div
          style={styles}
          className="fixed top-3 right-0 z-[100] w-fit max-w-[45vmin] bg-red-600 py-4 px-8"
        >
          <div className="flex row">
            <IconAlertCircle />
            <h3 className="mb-3 ml-5">System message</h3>
          </div>
          <p>{alert.message ? alert.message : "Some thing went wrongSome thing went wrongSome thing went wrong"}</p>
        </div>
      )}
    </Transition>
  );
};

export default Alert;
