
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CreditCard, 
  DollarSign, 
  Search, 
  Filter,
  Calendar,
  Receipt,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [transactions] = useState([
    {
      id: "TXN-2024-001",
      bookingId: "TO-001",
      amount: "$45,000",
      method: "American Express",
      date: "2024-07-15",
      status: "Paid",
      description: "JFK → LAX - Gulfstream G650"
    },
    {
      id: "TXN-2024-002", 
      bookingId: "TO-002",
      amount: "$72,000",
      method: "Wire Transfer",
      date: "2024-07-20",
      status: "Pending",
      description: "LAX → LHR - Bombardier Global 7500"
    },
    {
      id: "TXN-2024-003",
      bookingId: "TO-098",
      amount: "$42,000",
      method: "Chase Sapphire",
      date: "2024-06-15",
      status: "Paid",
      description: "JFK → LAX - Gulfstream G650"
    },
    {
      id: "TXN-2024-004",
      bookingId: "TO-097",
      amount: "$28,500",
      method: "Bank Transfer",
      date: "2024-06-08",
      status: "Paid",
      description: "MIA → TEB - Falcon 7X"
    },
    {
      id: "TXN-2024-005",
      bookingId: "TO-096",
      amount: "$18,000",
      method: "Platinum Card",
      date: "2024-05-28",
      status: "Failed",
      description: "LAX → SFO - Citation X+"
    }
  ]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || transaction.status === filterStatus;
    const matchesMethod = !filterMethod || transaction.method === filterMethod;
    const matchesDate = !filterDate || transaction.date === filterDate;
    
    return matchesSearch && matchesStatus && matchesMethod && matchesDate;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case "Paid": return <CheckCircle className="w-4 h-4" />;
      case "Pending": return <Clock className="w-4 h-4" />;
      case "Failed": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Paid": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Failed": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-bronze/20 text-bronze border-bronze/30";
    }
  };

  const getTotalAmount = () => {
    return filteredTransactions
      .filter(t => t.status === "Paid")
      .reduce((total, transaction) => {
        return total + parseFloat(transaction.amount.replace('$', '').replace(',', ''));
      }, 0).toLocaleString();
  };

  const getStatusCounts = () => {
    const counts = { Paid: 0, Pending: 0, Failed: 0 };
    filteredTransactions.forEach(t => counts[t.status]++);
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bronze">Payment History</h1>
          <p className="text-muted-foreground">Manage your transaction records</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge className="bg-bronze/20 text-bronze border-bronze/30">
            {filteredTransactions.length} Transactions
          </Badge>
          <p className="text-sm text-muted-foreground">
            Total Paid: <span className="text-bronze font-semibold">${getTotalAmount()}</span>
          </p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Paid Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-green-400">{statusCounts.Paid}</span>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              Pending Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-yellow-400">{statusCounts.Pending}</span>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" />
              Failed Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-red-400">{statusCounts.Failed}</span>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Transactions</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by ID, booking..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-bronze"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="method">Payment Method</Label>
              <Select value={filterMethod} onValueChange={setFilterMethod}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  <SelectItem value="">All Methods</SelectItem>
                  <SelectItem value="American Express">American Express</SelectItem>
                  <SelectItem value="Wire Transfer">Wire Transfer</SelectItem>
                  <SelectItem value="Chase Sapphire">Chase Sapphire</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Platinum Card">Platinum Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} className="glass-card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-bronze/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-bronze" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-bronze text-lg">{transaction.id}</h3>
                    <p className="text-sm text-muted-foreground">Booking: {transaction.bookingId}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Description</p>
                    <p className="text-sm">{transaction.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{transaction.date}</span>
                  </div>

                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Payment Method</p>
                    <p className="text-sm">{transaction.method}</p>
                  </div>

                  <Badge className={getStatusColor(transaction.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(transaction.status)}
                      {transaction.status}
                    </div>
                  </Badge>

                  <div className="text-right">
                    <p className="font-semibold text-bronze text-lg">{transaction.amount}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No transactions found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Payments;
