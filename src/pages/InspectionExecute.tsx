
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";

interface InspectionFormValues {
  property: string;
  date: string;
  inspector: string;
  status: "approved" | "rejected" | "pending";
  items: {
    id: string;
    name: string;
    checked: boolean;
    notes: string;
    condition: "good" | "fair" | "poor";
  }[];
  notes: string;
  images: FileList | null;
}

const defaultItems = [
  { id: "1", name: "Paredes e Teto", checked: false, notes: "", condition: "good" as const },
  { id: "2", name: "Piso", checked: false, notes: "", condition: "good" as const },
  { id: "3", name: "Portas e Janelas", checked: false, notes: "", condition: "good" as const },
  { id: "4", name: "Instalações Elétricas", checked: false, notes: "", condition: "good" as const },
  { id: "5", name: "Encanamento", checked: false, notes: "", condition: "good" as const },
];

export default function InspectionExecute() {
  const [items, setItems] = useState(defaultItems);
  
  const form = useForm<InspectionFormValues>({
    defaultValues: {
      property: "",
      date: new Date().toISOString().split("T")[0],
      inspector: "",
      status: "pending",
      items: defaultItems,
      notes: "",
      images: null,
    },
  });

  const handleItemChange = (id: string, field: "checked" | "notes" | "condition", value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const onSubmit = (data: InspectionFormValues) => {
    // Adicionando os items atualizados aos dados do formulário
    data.items = items;
    
    console.log("Dados da vistoria:", data);
    
    toast({
      title: "Vistoria salva",
      description: "A vistoria foi salva com sucesso.",
    });
  };

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Execução de Vistoria</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para registrar uma nova vistoria de imóvel.
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="property"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imóvel</FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço do imóvel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inspector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsável</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do vistoriador" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="approved" id="approved" />
                            <Label htmlFor="approved">Aprovado</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="rejected" id="rejected" />
                            <Label htmlFor="rejected">Reprovado</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pending" id="pending" />
                            <Label htmlFor="pending">Pendente</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Itens de Verificação</h3>
                
                {items.map((item) => (
                  <div key={item.id} className="border rounded-md p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`item-${item.id}`} 
                          checked={item.checked}
                          onCheckedChange={(checked) => 
                            handleItemChange(item.id, "checked", checked)
                          }
                        />
                        <Label htmlFor={`item-${item.id}`}>{item.name}</Label>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Label>Condição:</Label>
                        <RadioGroup 
                          value={item.condition} 
                          onValueChange={(value) => 
                            handleItemChange(item.id, "condition", value)
                          }
                          className="flex space-x-2"
                        >
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="good" id={`good-${item.id}`} />
                            <Label htmlFor={`good-${item.id}`}>Bom</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="fair" id={`fair-${item.id}`} />
                            <Label htmlFor={`fair-${item.id}`}>Regular</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="poor" id={`poor-${item.id}`} />
                            <Label htmlFor={`poor-${item.id}`}>Ruim</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`notes-${item.id}`}>Observações</Label>
                      <Textarea
                        id={`notes-${item.id}`}
                        value={item.notes}
                        onChange={(e) => 
                          handleItemChange(item.id, "notes", e.target.value)
                        }
                        placeholder="Detalhes sobre este item..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações Gerais</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Observações gerais sobre a vistoria..." 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Fotos</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          multiple
                          accept="image/*"
                          onChange={(e) => onChange(e.target.files)}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Adicione fotos da vistoria (opcional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit">Salvar Vistoria</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
