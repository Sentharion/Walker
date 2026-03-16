import { Notebook, Pencil, Save } from "lucide-react-native";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { useSavedWalkStore } from "@/store/savedStore";
import { useState } from "react";

const SavedNote = () => {
    const [isEditing, setIsEditing] = useState(false);
    const selectedWalk = useSavedWalkStore((state) => state.selectedWalk);
    const updateWalkNote = useSavedWalkStore((state) => state.updateWalkNote);
    const [editedNote, setEditedNote] = useState(selectedWalk?.note || "");

    const handleEdit = () => {
        setEditedNote(selectedWalk?.note || "");
        setIsEditing(true);
    };

    const handleSave = () => {
        if (selectedWalk) {
            updateWalkNote(selectedWalk.id, editedNote);
        }
        setIsEditing(false);
    };

    return (
        <View className="bg-white shadow-xl shadow-black/20 elevation-15 rounded-4xl my-6 mx-8 p-5 gap-3">
           <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <Notebook size={24} color="gray" />
                    <Text className="text-xl text-gray-700 font-bold opacity-90">Notatka</Text>
                </View>
                {!isEditing && (
                    <TouchableOpacity className="flex-row items-center gap-1" onPress={handleEdit}>
                        <Pencil size={20} color="green" />
                        <Text className="text-green-700 font-bold">Edytuj</Text>
                    </TouchableOpacity>
                
                )}
           </View>
            <View className="p-4">
                {isEditing ? (
                   <View className="flex-col items-center gap-1">
                     <TextInput
                        className="text-lg text-gray-800 border-2 border-emerald-200 rounded-xl p-3 font-medium w-full"
                        value={editedNote}
                        onChangeText={setEditedNote}
                        multiline
                        autoFocus
                    />
                        <View className="flex-row gap-2 mt-3">
                            <TouchableOpacity className="flex-row flex-1 items-center gap-1 bg-green-500 rounded-xl p-3 justify-center" onPress={handleSave}>
                                <Save size={20} color="white" />
                                <Text className="text-white font-bold text-center">Zapisz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row flex-1 items-center gap-1 bg-gray-300 rounded-xl p-3 justify-center" onPress={() => setIsEditing(false)}>
                                <Text className="text-gray-700 font-bold text-center">Anuluj</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <Text className="text-lg text-gray-600 font-medium">
                        {selectedWalk?.note || "Brak notatki"}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default SavedNote;