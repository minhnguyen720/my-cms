import { activeAlertAtom } from "@/atoms";
import { Transition } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import useAlert from "./hooks";
import { ALERT_CODES, ALERT_STYLING } from "@/constant";

interface Props {}

const Alert: React.FC<Props> = () => {
  const [alert, setAlert] = useAtom(activeAlertAtom);
  const [bg, setBg] = useState(ALERT_STYLING.INFO);
  const [ready, setReady] = useState<boolean>(false);
  const { closeAlert } = useAlert();
  useEffect(() => {
    if (alert.activeFlag) {
      try {
        switch (alert.type) {
          case ALERT_CODES.INFO:
            setBg(ALERT_STYLING.INFO);
            break;
          case ALERT_CODES.WARNING:
            setBg(ALERT_STYLING.WARNING);
            break;
          case ALERT_CODES.ERROR:
            setBg(ALERT_STYLING.ERROR);
            break;
          case ALERT_CODES.SUCCESS:
            setBg(ALERT_STYLING.SUCCESS);
            break;
          default:
            setBg(ALERT_STYLING.INFO);
            break;
        }
        setTimeout(() => {
          closeAlert();
          setReady(false);
        }, 2000);
      } catch (error) {
        console.error(error);
      } finally {
        setReady(true);
      }
    }
  }, [alert.activeFlag, alert.type, closeAlert, setAlert]);

  return (
    <>
      {ready && (
        <Transition
          mounted={alert.activeFlag}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <div
              style={{
                ...styles,
                backgroundColor:bg
              }}
              className={`fixed top-3 right-0 z-[100] w-fit max-w-[45vmin] ${bg} py-4 px-8`}
            >
              <div className="flex row">
                <IconAlertCircle />
                <h3 className="mb-3 ml-5">System message</h3>
              </div>
              <p>
                {alert.message
                  ? alert.message
                  : "Some thing went wrongSome thing went wrongSome thing went wrong"}
              </p>
            </div>
          )}
        </Transition>
      )}
    </>
  );
};

export default Alert;
