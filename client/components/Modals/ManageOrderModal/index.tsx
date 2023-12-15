import {
  ActionIcon,
  Button,
  Checkbox,
  Modal,
  Table,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { IconList } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import { FieldHandler } from "@/components/Fields/hooks/useFields";
import useLoading from "@/hooks/utilities/useLoading";
import { MESSAGES } from "@/constant";

interface Props {
  fieldHandler: FieldHandler;
}

const ManageOrderModal: React.FC<Props> = ({ fieldHandler }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { detailId } = useParams();
  const [baseUrl] = useGetBaseUrl();
  const [data, setData] = useState<any[]>([]);
  const at = getCookie("at");
  const { showLoading, hideLoading } = useLoading();
  const [selected, setSelected] = useState<string[]>([]);

  const handleOnClose = () => {
    setData([]);
    setSelected([]);
    close();
  };

  const handleOnOpen = async () => {
    const res = await axios.get(`${baseUrl}/fields/${detailId}`, {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
    if (res.data.isSuccess) {
      setData(res.data.fieldData);
      open();
    } else {
      errorNotification("Fail to fetch data");
      handleOnClose();
    }
  };

  const handleSelect = (e) => {
    const id = e.target.dataset.id;

    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => {
          return item !== id;
        });
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSwapOrder = async () => {
    try {
      showLoading();
      const res = await axios.put(
        `${baseUrl}/fields/swap`,
        { selected },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      if (res.data.isSuccess) {
        successNotification("Swap order successs");
        const newRowRes = await axios.get(`${baseUrl}/fields/${detailId}`, {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });
        if (newRowRes.data.isSuccess) {
          setData(newRowRes.data.fieldData);
          fieldHandler.initFieldDetail();
          setSelected([]);
        } else {
          errorNotification("Fail to fetch data");
          handleOnClose();
        }
      } else {
        errorNotification("Fail to swap order");
      }
    } catch (error) {
      console.error(error);
      errorNotification(MESSAGES.GENERAL_MESSAGE);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <Modal
        title="Field order management"
        opened={opened}
        onClose={handleOnClose}
        size={"90%"}
        centered
      >
        <Button onClick={handleSwapOrder}>Swap order</Button>
        <Table verticalSpacing={"lg"}>
          <thead>
            <tr>
              <th></th>
              <th>Field ID</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <Checkbox
                        checked={selected.includes(item._id)}
                        onChange={handleSelect}
                        data-id={item._id}
                        disabled={
                          selected.length >= 2 && !selected.includes(item._id)
                        }
                      />
                    </td>
                    <td>{item.fieldId}</td>
                    <td>{item.order}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Modal>
      <Tooltip label="Change field order">
        <ActionIcon onClick={handleOnOpen}>
          <IconList />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default ManageOrderModal;
