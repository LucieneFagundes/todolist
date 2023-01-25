import { ClipboardText } from "phosphor-react";
import styles from "./NoItems.module.css";

export function NoItems() {
  return (
    <div className={styles.noItems}>
      <ClipboardText size={56} weight="thin" />
      <p>Você ainda não tem tarefas cadastradas</p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
