import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMessages } from "@/hooks/useContact";

const AdminMessages = () => {
  const { data: messages = [] } = useMessages();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Contact Messages</h3>
        <p className="text-sm text-muted-foreground">
          Messages received through your contact form
        </p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <p>No messages yet</p>
                <p className="text-sm">Messages from your contact form will appear here</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => (
            <Card key={message.id} className="shadow-soft">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{message.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {message.email} • {formatDate(message.created_at)}
                    </CardDescription>
                  </div>
                  {!message.read && (
                    <Badge variant="default" className="bg-gradient-primary">
                      New
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className="font-medium text-sm text-muted-foreground">
                    Subject: {message.subject}
                  </p>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <p className="whitespace-pre-wrap">{message.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;