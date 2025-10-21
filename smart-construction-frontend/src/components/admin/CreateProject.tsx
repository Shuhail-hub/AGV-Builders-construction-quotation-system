import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Upload, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

interface Room {
  id: string;
  type: string;
  length: number;
  width: number;
  height: number;
  windowWidth: number;
  windowHeight: number;
  windowType: string;
}

interface Floor {
  id: string;
  name: string;
  rooms: Room[];
  expanded: boolean;
}

const BRICK_SIZE = { length: 0.667, width: 0.333, height: 0.25 }; // in feet
const TILE_SIZE = 2; // 2x2 feet
const BRICK_RATE = 15; // Rs per brick
const TILE_RATE = 150; // Rs per sq.ft
const WINDOW_RATES = { Wood: 3500, Aluminium: 4500 }; // Rs per sq.ft

export default function CreateProject() {
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    customer: '',
    description: '',
    blueprint: null as File | null
  });

  const [showManualQuotation, setShowManualQuotation] = useState(false);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [labourData, setLabourData] = useState({
    workers: 10,
    dailyRate: 1500,
    projectDays: 90
  });
  const [fixedCosts, setFixedCosts] = useState({
    electricity: 25000,
    water: 15000,
    transport: 30000
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, blueprint: e.target.files[0] });
      toast.success('Blueprint uploaded successfully');
    }
  };

  const addFloor = (floorName: string) => {
    const newFloor: Floor = {
      id: Date.now().toString(),
      name: floorName,
      rooms: [],
      expanded: true
    };
    setFloors([...floors, newFloor]);
    toast.success(`${floorName} added`);
  };

  const removeFloor = (floorId: string) => {
    setFloors(floors.filter(f => f.id !== floorId));
    toast.info('Floor removed');
  };

  const toggleFloorExpanded = (floorId: string) => {
    setFloors(floors.map(f => 
      f.id === floorId ? { ...f, expanded: !f.expanded } : f
    ));
  };

  const addRoom = (floorId: string, roomType: string) => {
    const newRoom: Room = {
      id: Date.now().toString(),
      type: roomType,
      length: 12,
      width: 10,
      height: 10,
      windowWidth: 4,
      windowHeight: 4,
      windowType: 'Wood'
    };
    
    setFloors(floors.map(f => 
      f.id === floorId ? { ...f, rooms: [...f.rooms, newRoom] } : f
    ));
    toast.success(`${roomType} added`);
  };

  const removeRoom = (floorId: string, roomId: string) => {
    setFloors(floors.map(f => 
      f.id === floorId ? { ...f, rooms: f.rooms.filter(r => r.id !== roomId) } : f
    ));
  };

  const updateRoom = (floorId: string, roomId: string, field: string, value: any) => {
    setFloors(floors.map(f => 
      f.id === floorId ? {
        ...f,
        rooms: f.rooms.map(r => 
          r.id === roomId ? { ...r, [field]: value } : r
        )
      } : f
    ));
  };

  const calculateRoomCost = (room: Room) => {
    const wallArea = 2 * (room.length + room.width) * room.height;
    const floorArea = room.length * room.width;
    const windowArea = room.windowWidth * room.windowHeight;
    
    // Brick calculation (for walls)
    const brickVolume = BRICK_SIZE.length * BRICK_SIZE.width * BRICK_SIZE.height;
    const bricksNeeded = Math.ceil((wallArea - windowArea) / (BRICK_SIZE.length * BRICK_SIZE.height));
    const brickCost = bricksNeeded * BRICK_RATE;
    
    // Tile calculation
    const tilesNeeded = Math.ceil(floorArea / (TILE_SIZE * TILE_SIZE));
    const tileCost = floorArea * TILE_RATE;
    
    // Window cost
    const windowCost = windowArea * WINDOW_RATES[room.windowType as keyof typeof WINDOW_RATES];
    
    return {
      bricksNeeded,
      brickCost,
      tilesNeeded,
      tileCost,
      windowCost,
      total: brickCost + tileCost + windowCost
    };
  };

  const calculateTotalMaterialCost = () => {
    let total = 0;
    floors.forEach(floor => {
      floor.rooms.forEach(room => {
        total += calculateRoomCost(room).total;
      });
    });
    return total;
  };

  const calculateLabourCost = () => {
    return labourData.workers * labourData.dailyRate * labourData.projectDays;
  };

  const calculateFixedCosts = () => {
    return fixedCosts.electricity + fixedCosts.water + fixedCosts.transport;
  };

  const calculateGrandTotal = () => {
    return calculateTotalMaterialCost() + calculateLabourCost() + calculateFixedCosts();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Project created successfully!');
    // Reset form
    setFormData({
      projectName: '',
      location: '',
      customer: '',
      description: '',
      blueprint: null
    });
    setShowManualQuotation(false);
    setFloors([]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl text-[#1F2937] mb-2">Create New Project</h1>
            <p className="text-gray-600">Add a new construction project and upload blueprints</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input
                        id="projectName"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        required
                        placeholder="e.g., Modern Villa in Colombo"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        placeholder="e.g., Colombo 07, Sri Lanka"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customer">Select Customer</Label>
                      <Select value={formData.customer} onValueChange={(value) => setFormData({ ...formData, customer: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a customer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nimal">Nimal Perera</SelectItem>
                          <SelectItem value="kavindu">Kavindu Silva</SelectItem>
                          <SelectItem value="tharushi">Tharushi Fernando</SelectItem>
                          <SelectItem value="dilshan">Dilshan Jayawardena</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Project Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        placeholder="Describe the project requirements..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="blueprint">Upload Blueprint (PDF/PNG) - Optional</Label>
                      <div className="mt-2">
                        <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-[#FF6B35] focus:outline-none">
                          <span className="flex items-center space-x-2">
                            <Upload className="size-6 text-gray-600" />
                            <span className="text-gray-600">
                              {formData.blueprint ? formData.blueprint.name : 'Click to upload blueprint'}
                            </span>
                          </span>
                          <input
                            id="blueprint"
                            type="file"
                            className="hidden"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Quotation Method Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        disabled
                        className="opacity-50 cursor-not-allowed"
                      >
                        🔮 Generate from Blueprint
                        <span className="block text-xs text-gray-500">(Future Feature)</span>
                      </Button>
                      <Button 
                        type="button"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => setShowManualQuotation(true)}
                      >
                        ✍️ Add Quotation Manually
                      </Button>
                    </div>

                    {!showManualQuotation && (
                      <Button type="submit" className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]">
                        Create Project (Without Quotation)
                      </Button>
                    )}
                  </form>
                </CardContent>
              </Card>

              {/* Manual Quotation Builder */}
              {showManualQuotation && (
                <Card>
                  <CardHeader>
                    <CardTitle>Manual Quotation Builder</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Floor Section */}
                    <div>
                      <Label className="mb-3 block">Floor Sections</Label>
                      <div className="flex gap-2 mb-4">
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline"
                          onClick={() => addFloor('Ground Floor')}
                        >
                          <Plus className="size-4 mr-1" /> Ground Floor
                        </Button>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline"
                          onClick={() => addFloor('First Floor')}
                        >
                          <Plus className="size-4 mr-1" /> First Floor
                        </Button>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline"
                          onClick={() => addFloor(`Floor ${floors.length + 1}`)}
                        >
                          <Plus className="size-4 mr-1" /> Add Floor
                        </Button>
                      </div>

                      {/* Floors List */}
                      <div className="space-y-4">
                        {floors.map((floor) => (
                          <div key={floor.id} className="border rounded-lg p-4 bg-white">
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => toggleFloorExpanded(floor.id)}
                                >
                                  {floor.expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                                </Button>
                                <h4>{floor.name}</h4>
                                <span className="text-sm text-gray-500">({floor.rooms.length} rooms)</span>
                              </div>
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => removeFloor(floor.id)}
                              >
                                <X className="size-4" />
                              </Button>
                            </div>

                            {floor.expanded && (
                              <>
                                <div className="flex gap-2 mb-4 flex-wrap">
                                  <Button type="button" size="sm" variant="outline" onClick={() => addRoom(floor.id, 'Living Room')}>
                                    + Living Room
                                  </Button>
                                  <Button type="button" size="sm" variant="outline" onClick={() => addRoom(floor.id, 'Bedroom')}>
                                    + Bedroom
                                  </Button>
                                  <Button type="button" size="sm" variant="outline" onClick={() => addRoom(floor.id, 'Kitchen')}>
                                    + Kitchen
                                  </Button>
                                  <Button type="button" size="sm" variant="outline" onClick={() => addRoom(floor.id, 'Bathroom')}>
                                    + Bathroom
                                  </Button>
                                  <Button type="button" size="sm" variant="outline" onClick={() => addRoom(floor.id, 'Custom Room')}>
                                    + Another Room
                                  </Button>
                                </div>

                                {/* Rooms */}
                                <div className="space-y-4">
                                  {floor.rooms.map((room) => {
                                    const costs = calculateRoomCost(room);
                                    return (
                                      <div key={room.id} className="bg-gray-50 p-4 rounded border">
                                        <div className="flex justify-between items-start mb-3">
                                          <h5 className="text-sm">{room.type}</h5>
                                          <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => removeRoom(floor.id, room.id)}
                                          >
                                            <X className="size-3" />
                                          </Button>
                                        </div>

                                        <div className="grid grid-cols-3 gap-3 mb-3">
                                          <div>
                                            <Label className="text-xs">Length (ft)</Label>
                                            <Input
                                              type="number"
                                              value={room.length}
                                              onChange={(e) => updateRoom(floor.id, room.id, 'length', parseFloat(e.target.value) || 0)}
                                              className="h-8"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-xs">Width (ft)</Label>
                                            <Input
                                              type="number"
                                              value={room.width}
                                              onChange={(e) => updateRoom(floor.id, room.id, 'width', parseFloat(e.target.value) || 0)}
                                              className="h-8"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-xs">Height (ft)</Label>
                                            <Input
                                              type="number"
                                              value={room.height}
                                              onChange={(e) => updateRoom(floor.id, room.id, 'height', parseFloat(e.target.value) || 0)}
                                              className="h-8"
                                            />
                                          </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-3 mb-3">
                                          <div>
                                            <Label className="text-xs">Window Width (ft)</Label>
                                            <Input
                                              type="number"
                                              value={room.windowWidth}
                                              onChange={(e) => updateRoom(floor.id, room.id, 'windowWidth', parseFloat(e.target.value) || 0)}
                                              className="h-8"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-xs">Window Height (ft)</Label>
                                            <Input
                                              type="number"
                                              value={room.windowHeight}
                                              onChange={(e) => updateRoom(floor.id, room.id, 'windowHeight', parseFloat(e.target.value) || 0)}
                                              className="h-8"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-xs">Window Type</Label>
                                            <Select 
                                              value={room.windowType} 
                                              onValueChange={(value) => updateRoom(floor.id, room.id, 'windowType', value)}
                                            >
                                              <SelectTrigger className="h-8">
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="Wood">Wood</SelectItem>
                                                <SelectItem value="Aluminium">Aluminium</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>

                                        <div className="bg-white p-3 rounded text-xs space-y-1">
                                          <div className="flex justify-between">
                                            <span>Bricks: {costs.bricksNeeded} units</span>
                                            <span>Rs. {costs.brickCost.toLocaleString()}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Tiles: {costs.tilesNeeded} units (2x2 ft)</span>
                                            <span>Rs. {costs.tileCost.toLocaleString()}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Window ({room.windowType})</span>
                                            <span>Rs. {costs.windowCost.toLocaleString()}</span>
                                          </div>
                                          <Separator className="my-2" />
                                          <div className="flex justify-between text-[#FF6B35]">
                                            <span>Room Total:</span>
                                            <span>Rs. {costs.total.toLocaleString()}</span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Labour Charges */}
                    <div className="border rounded-lg p-4">
                      <Label className="mb-3 block">Labour Charges</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-xs">Number of Workers</Label>
                          <Input
                            type="number"
                            value={labourData.workers}
                            onChange={(e) => setLabourData({ ...labourData, workers: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Daily Rate (Rs)</Label>
                          <Input
                            type="number"
                            value={labourData.dailyRate}
                            onChange={(e) => setLabourData({ ...labourData, dailyRate: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Project Days</Label>
                          <Input
                            type="number"
                            value={labourData.projectDays}
                            onChange={(e) => setLabourData({ ...labourData, projectDays: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-700">
                        Total Labour Cost: <span className="text-[#FF6B35]">Rs. {calculateLabourCost().toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Fixed Costs */}
                    <div className="border rounded-lg p-4">
                      <Label className="mb-3 block">Fixed Charges</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-xs">Electricity (Rs)</Label>
                          <Input
                            type="number"
                            value={fixedCosts.electricity}
                            onChange={(e) => setFixedCosts({ ...fixedCosts, electricity: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Water (Rs)</Label>
                          <Input
                            type="number"
                            value={fixedCosts.water}
                            onChange={(e) => setFixedCosts({ ...fixedCosts, water: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Transport (Rs)</Label>
                          <Input
                            type="number"
                            value={fixedCosts.transport}
                            onChange={(e) => setFixedCosts({ ...fixedCosts, transport: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-700">
                        Total Fixed Costs: <span className="text-[#FF6B35]">Rs. {calculateFixedCosts().toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="button" onClick={handleSubmit} className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]">
                      Create Project with Quotation
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              {showManualQuotation ? (
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Quotation Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Material Cost</span>
                      <span>Rs. {calculateTotalMaterialCost().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Labour Cost</span>
                      <span>Rs. {calculateLabourCost().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fixed Costs</span>
                      <span>Rs. {calculateFixedCosts().toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl text-[#FF6B35]">
                      <span>Grand Total</span>
                      <span>Rs. {calculateGrandTotal().toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      Last Updated: {new Date().toLocaleString('en-GB', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Choose how to create your project quotation:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-[#FF6B35] mr-2">•</span>
                        <span>Generate from Blueprint (Future AI feature)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF6B35] mr-2">•</span>
                        <span>Add quotation details manually with floor-by-floor room calculations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF6B35] mr-2">•</span>
                        <span>Auto-calculate material requirements and costs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
