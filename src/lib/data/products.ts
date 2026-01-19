export type Product = {
	id: string;
	name: string;
	price: number;
	image: string;
    description?: string;
    quantity: number;
};

export const products: Product[] = [
    {
      id: '1',
      name: 'Χειροποίητο Μάλλινο Κασκόλ',
      price: 45.00,
      image: 'https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?q=80&w=800&auto=format&fit=crop',
      description: 'Ένα ζεστό και απαλό κασκόλ, πλεγμένο στο χέρι από 100% οργανικό μαλλί. Ιδανικό για τις κρύες μέρες του χειμώνα, προσφέροντας άνεση και στυλ.',
      quantity: 5
    },
    {
      id: '2',
      name: 'Ρουστίκ Πήλινη Κούπα',
      price: 28.00,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop',
      description: 'Μια μοναδική κεραμική κούπα, φτιαγμένη στον τροχό και ψημένη σε παραδοσιακό φούρνο. Το γήινο χρώμα και η υφή της την κάνουν ξεχωριστή.',
      quantity: 12
    },
     {
      id: '3',
      name: 'Ξύλο Κοπής Ελιάς',
      price: 55.00,
      image: 'https://images.unsplash.com/photo-1621256334659-150244431e07?q=80&w=800&auto=format&fit=crop',
      description: 'Χειροποίητο ξύλο κοπής από μασίφ ξύλο ελιάς. Ανθεκτικό και πανέμορφο, μπορεί να χρησιμοποιηθεί και ως πιατέλα σερβιρίσματος.',
      quantity: 8
    },
     {
      id: '4',
      name: 'Σετ Κεριών Μελισσοκέρινου',
      price: 32.00,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
      description: 'Σετ από τρία φυσικά κεριά μελισσοκέρινου. Καίγονται καθαρά χωρίς να απελευθερώνουν τοξίνες, γεμίζοντας τον χώρο με ένα διακριτικό άρωμα μελιού.',
      quantity: 20
    },
    {
      id: '5',
      name: 'Βάζο Τερακότα',
      price: 60.00,
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop',
      description: 'Διακοσμητικό βάζο τερακότα με ανάγλυφες λεπτομέρειες. Μια διαχρονική προσθήκη στη διακόσμηση του σπιτιού σας.',
      quantity: 3
    },
    {
      id: '6',
      name: 'Σαπούνι Λεβάντας',
      price: 12.00,
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop',
      description: 'Φυσικό σαπούνι ελαιολάδου με αιθέριο έλαιο λεβάντας. Καθαρίζει απαλά και ενυδατώνει το δέρμα, αφήνοντας μια αίσθηση χαλάρωσης.',
      quantity: 15
    },
];
