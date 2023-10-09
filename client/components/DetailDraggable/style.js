import {createStyles} from "@mantine/core"

const useStyles = createStyles((theme) => {
    item {
        display: flex,
        alignItems: center,
        borderRadius: "12px"
        border: rem(1px) solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5));
        padding: var(--mantine-spacing-sm) var(--mantine-spacing-xl);
        padding-left: calc(var(--mantine-spacing-xl) - var(--mantine-spacing-md));
        background-color: light-dark(var(--mantine-color-white), var(--mantine-color-dark-5));
        margin-bottom: var(--mantine-spacing-sm);
      }
})