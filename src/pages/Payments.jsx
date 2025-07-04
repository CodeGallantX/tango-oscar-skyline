import { useState, useEffect, useRef } from "react";
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
  XCircle,
  Wallet,
  Plus,
  Eye,
  EyeOff,
  Save,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Payments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showBalance, setShowBalance] = useState(true);
  const [showFundModal, setShowFundModal] = useState(false);
  const [showSaveCardModal, setShowSaveCardModal] = useState(false);
  const [showNewWalletModal, setShowNewWalletModal] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [newWalletName, setNewWalletName] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [savedCards, setSavedCards] = useState([]);
  const [activeWalletIndex, setActiveWalletIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Sample wallet data - in a real app, this would come from your backend
  const [wallets, setWallets] = useState([
    {
      id: "wallet-1",
      name: "Primary Wallet",
      balance: 0,
      currency: "USD",
      createdAt: new Date().toISOString()
    }
  ]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedWallets = localStorage.getItem('wallets');
    const savedCardsData = localStorage.getItem('savedCards');
    
    if (savedWallets) {
      setWallets(JSON.parse(savedWallets));
    }
    
    if (savedCardsData) {
      setSavedCards(JSON.parse(savedCardsData));
    }
  }, []);

  // Save wallets to localStorage when they change
  useEffect(() => {
    localStorage.setItem('wallets', JSON.stringify(wallets));
  }, [wallets]);

  const [transactions, setTransactions] = useState([
    {
      id: "TXN-2024-001",
      bookingId: "TO-001",
      amount: "$45,000",
      method: "American Express",
      date: "2024-07-15",
      status: "Paid",
      description: "JFK → LAX - Gulfstream G650",
      walletId: "wallet-1"
    },
    {
      id: "TXN-2024-002", 
      bookingId: "TO-002",
      amount: "$72,000",
      method: "Wire Transfer",
      date: "2024-07-20",
      status: "Pending",
      description: "LAX → LHR - Bombardier Global 7500",
      walletId: "wallet-1"
    }
  ]);

  // Carousel drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scrollToWallet = (index) => {
    const carousel = carouselRef.current;
    const walletElement = carousel.children[index];
    walletElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
    setActiveWalletIndex(index);
  };

  const handlePrevWallet = () => {
    const newIndex = activeWalletIndex > 0 ? activeWalletIndex - 1 : wallets.length - 1;
    scrollToWallet(newIndex);
  };

  const handleNextWallet = () => {
    const newIndex = activeWalletIndex < wallets.length - 1 ? activeWalletIndex + 1 : 0;
    scrollToWallet(newIndex);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || transaction.status === filterStatus;
    const matchesMethod = !filterMethod || transaction.method === filterMethod;
    const matchesDate = !filterDate || transaction.date === filterDate;
    const matchesWallet = transaction.walletId === wallets[activeWalletIndex]?.id;
    
    return matchesSearch && matchesStatus && matchesMethod && matchesDate && matchesWallet;
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

  const handleCreateWallet = () => {
    if (!newWalletName.trim()) {
      toast({
        title: "Wallet name required",
        description: "Please enter a name for your new wallet",
        variant: "destructive"
      });
      return;
    }

    const newWallet = {
      id: `wallet-${Date.now()}`,
      name: newWalletName,
      balance: 0,
      currency: "USD",
      createdAt: new Date().toISOString()
    };

    setWallets([...wallets, newWallet]);
    setNewWalletName("");
    setShowNewWalletModal(false);
    setTimeout(() => {
      scrollToWallet(wallets.length); // Scroll to the new wallet
    }, 100);

    toast({
      title: "Wallet Created",
      description: `${newWalletName} wallet has been created`,
    });
  };

  const handleFundWallet = () => {
    if (!fundAmount || isNaN(fundAmount) || parseFloat(fundAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to fund your wallet",
        variant: "destructive"
      });
      return;
    }

    if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
      toast({
        title: "Missing Card Details",
        description: "Please fill in all card details",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(fundAmount);
    const updatedWallets = [...wallets];
    updatedWallets[activeWalletIndex].balance += amount;
    setWallets(updatedWallets);

    // Add transaction
    const newTransaction = {
      id: `TXN-${Date.now()}`,
      bookingId: "WALLET",
      amount: `$${amount.toLocaleString()}`,
      method: "Card Payment",
      date: new Date().toISOString().split('T')[0],
      status: "Paid",
      description: "Wallet Funding",
      walletId: wallets[activeWalletIndex].id
    };

    setTransactions([newTransaction, ...transactions]);

    // Save card if requested
    if (saveCard) {
      const newCard = {
        ...cardDetails,
        id: `CARD-${Date.now()}`,
        lastFour: cardDetails.number.slice(-4)
      };
      const updatedCards = [...savedCards, newCard];
      setSavedCards(updatedCards);
      localStorage.setItem('savedCards', JSON.stringify(updatedCards));
    }

    // Reset form
    setFundAmount("");
    setCardDetails({
      number: "",
      name: "",
      expiry: "",
      cvv: ""
    });
    setSaveCard(false);
    setShowFundModal(false);

    toast({
      title: "Wallet Funded",
      description: `Successfully added $${amount.toLocaleString()} to ${wallets[activeWalletIndex].name}`,
    });
  };

  const formatCardNumber = (number) => {
    return number.replace(/\d{4}(?=.)/g, '$& ');
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 16) {
      setCardDetails({...cardDetails, number: value});
    }
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 4) {
      // Add slash after 2 digits
      let formatted = value;
      if (value.length > 2) {
        formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
      }
      setCardDetails({...cardDetails, expiry: formatted});
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Wallets Carousel Section */}
      <div className="relative mx-4">
        {wallets.length > 1 && (
          <>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handlePrevWallet}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 hover:bg-background rounded-full shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleNextWallet}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 hover:bg-background rounded-full shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 pb-4 ${wallets.length > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {wallets.map((wallet, index) => (
            <div 
              key={wallet.id} 
              className="flex-shrink-0 snap-center w-4/5 sm:w-3/5 md:w-3/5 lg:w-1/2 xl:w-1/3 px-2"
            >
              <Card className={`glass-card h-full mt-2 ${index === activeWalletIndex ? 'ring-2 ring-bronze' : ''}`}>
                <CardHeader className="flex flex-col sm:flex-row justify-start sm:justify-between item-start sm:items-center">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <Wallet className="w-6 h-6 text-bronze" />
                    <div>
                      <CardTitle className="text-bronze">{wallet.name}</CardTitle>
                      <CardDescription>Available funds: {wallet.currency}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Current Balance</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-bronze">
                          {showBalance ? `$${wallet.balance.toLocaleString()}` : '••••••'}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setShowBalance(!showBalance)}
                          className="text-muted-foreground hover:text-bronze"
                        >
                          {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => {
                      setShowFundModal(true);
                      setActiveWalletIndex(index);
                    }}
                    className="bg-bronze hover:bg-bronze/90 text-black flex-1"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Fund Wallet
                  </Button>
                  {wallets.length > 1 && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        const updatedWallets = wallets.filter((_, i) => i !== index);
                        setWallets(updatedWallets);
                        if (activeWalletIndex >= updatedWallets.length) {
                          setActiveWalletIndex(updatedWallets.length - 1);
                        }
                      }}
                      className="text-red-400 hover:text-red-500 border-red-400/30 hover:border-red-500/50 flex-1"
                    >
                      Remove Wallet
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Wallet indicators for mobile */}
        {wallets.length > 1 && (
          <div className="flex justify-center gap-2 mt-2 sm:hidden">
            {wallets.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToWallet(index)}
                className={`w-2 h-2 rounded-full ${index === activeWalletIndex ? 'bg-bronze' : 'bg-muted-foreground/30'}`}
                aria-label={`Go to wallet ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Wallet Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setShowNewWalletModal(true)}
          variant="outline"
          className="border-bronze text-bronze hover:bg-bronze/10"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Wallet
        </Button>
      </div>

      {/* New Wallet Modal */}
      {showNewWalletModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md glass-card">
            <CardHeader>
              <CardTitle className="text-bronze">Create New Wallet</CardTitle>
              <CardDescription>Add a new wallet to organize your funds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="walletName">Wallet Name</Label>
                <Input
                  id="walletName"
                  placeholder="e.g. Travel Wallet, Business Wallet"
                  value={newWalletName}
                  onChange={(e) => setNewWalletName(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-bronze"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewWalletModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateWallet}
                  className="bg-bronze hover:bg-bronze/90 text-black"
                >
                  Create Wallet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Fund Wallet Modal */}
      {showFundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md glass-card">
            <CardHeader>
              <CardTitle className="text-bronze">Fund {wallets[activeWalletIndex]?.name}</CardTitle>
              <CardDescription>Add funds using your debit/credit card</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 focus:border-bronze"
                  />
                </div>
              </div>

              <div>
                <Label>Card Details</Label>
                <div className="space-y-3">
                  <Input
                    placeholder="Card Number"
                    value={formatCardNumber(cardDetails.number)}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                  <Input
                    placeholder="Cardholder Name"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleExpiryChange}
                      maxLength={5}
                      className="bg-background/50 border-border/50 focus:border-bronze"
                    />
                    <Input
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) {
                          setCardDetails({...cardDetails, cvv: value});
                        }
                      }}
                      maxLength={4}
                      type="password"
                      className="bg-background/50 border-border/50 focus:border-bronze"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="h-4 w-4 rounded border-border focus:ring-bronze text-bronze"
                />
                <Label htmlFor="saveCard">Save this card for future payments</Label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowFundModal(false);
                    setCardDetails({
                      number: "",
                      name: "",
                      expiry: "",
                      cvv: ""
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleFundWallet}
                  className="bg-bronze hover:bg-bronze/90 text-black"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Add Funds
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Saved Cards Modal */}
      {showSaveCardModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md glass-card">
            <CardHeader>
              <CardTitle className="text-bronze">Saved Payment Methods</CardTitle>
              <CardDescription>Your saved cards for quick payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedCards.length > 0 ? (
                <div className="space-y-3">
                  {savedCards.map((card) => (
                    <Card key={card.id} className="glass-card-hover">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">•••• •••• •••• {card.lastFour}</p>
                          <p className="text-sm text-muted-foreground">{card.name}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-400 hover:text-red-500"
                          onClick={() => {
                            const updatedCards = savedCards.filter(c => c.id !== card.id);
                            setSavedCards(updatedCards);
                            localStorage.setItem('savedCards', JSON.stringify(updatedCards));
                          }}
                        >
                          Remove
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No saved payment methods</p>
                </div>
              )}
              
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={() => setShowSaveCardModal(false)}
                  className="bg-bronze hover:bg-bronze/90 text-black"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment History Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bronze">Payment History</h1>
          <p className="text-muted-foreground">Transactions for {wallets[activeWalletIndex]?.name}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowSaveCardModal(true)}
              className="border-bronze text-bronze hover:bg-bronze hover:text-black"
            >
              <Save className="w-4 h-4 mr-2" />
              Saved Cards
            </Button>
            <Badge className="bg-bronze/20 text-bronze border-bronze/30">
              {filteredTransactions.length} Transactions
            </Badge>
          </div>
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
                  <SelectItem value="all">All Statuses</SelectItem>
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
                  <SelectItem value="all">All Methods</SelectItem>
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