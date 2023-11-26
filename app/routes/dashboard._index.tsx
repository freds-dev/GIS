import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const cards = [
  {
    title: "Card Title",
    description: "Card Description",
    content: "Card Content",
    footer: "Card Footer",
  },
  {
    title: "Card Title",
    description: "Card Description",
    content: "Card Content",
    footer: "Card Footer",
  },
  {
    title: "Card Title",
    description: "Card Description",
    content: "Card Content",
    footer: "Card Footer",
  },
  {
    title: "Card Title",
    description: "Card Description",
    content: "Card Content",
    footer: "Card Footer",
  },
  {
    title: "Card Title",
    description: "Card Description",
    content: "Card Content",
    footer: "Card Footer",
  },
  {
    title: "Card Title",
    description: "Card Description",
    content: "Card Content",
    footer: "Card Footer",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center flex-wrap gap-4">
      {cards.map((card, i) => (
        <Card className="w-1/4" key={i}>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{card.content}</p>
          </CardContent>
          <CardFooter>
            <p>{card.footer}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
