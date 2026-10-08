import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    description: "Registered users",
  },
  {
    title: "Company Applications",
    value: "24",
    description: "Pending review",
  },
  {
    title: "Assessments",
    value: "86",
    description: "Total assessments",
  },
  {
    title: "Payments",
    value: "৳42,500",
    description: "Total transactions",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>

        <p className="text-muted-foreground">
          Manage users, companies, assessments and platform activities.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>

              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Company Applications</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Company applications will appear here.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Platform Activity</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Recent platform activities will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
