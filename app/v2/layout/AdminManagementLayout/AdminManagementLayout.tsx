import adminManagementLayoutStyles from "./AdminManagementLayout.css";

interface AdminManagementLayoutProps {
  children: React.ReactNode;
  side: React.ReactNode;
}

export default function AdminManagementLayout({
  children,
  side,
}: AdminManagementLayoutProps) {
  const styles = adminManagementLayoutStyles;

  return (
    <div className={styles.wrap}>
      <div className={styles.container}></div>
      <div className="w-3/4">{children}</div>
    </div>
  );
}
